import db from "../config/db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.HOSTEMAIL,
  port: process.env.HOSTPORT,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// Fungsi untuk memformat angka menjadi Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

// Fungsi untuk mengubah nama bulan dari bahasa Inggris ke bahasa Indonesia
const convertMonthToIndonesian = (month) => {
  const months = {
    January: "Januari",
    February: "Februari",
    March: "Maret",
    April: "April",
    May: "Mei",
    June: "Juni",
    July: "Juli",
    August: "Agustus",
    September: "September",
    October: "Oktober",
    November: "November",
    December: "Desember",
  };
  return months[month] || month;
};

export const sendEmailRev = async (req, res) => {
  try {
    // Query untuk mendapatkan data bu_code dan email
    const emailQuery = `SELECT bu_code, email FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_EMAIL]`;
    const emailResult = await db.query(emailQuery); // Pastikan variabel emailResult dideklarasikan di sini
    const emailRecipients = emailResult.recordset.reduce((acc, row) => {
      acc[row.bu_code] = row.email;
      return acc;
    }, {});

    // Iterasi melalui semua bu_code yang diperoleh dari query pertama
    for (const bu_code in emailRecipients) {
      const recipientEmail = emailRecipients[bu_code];
      if (!recipientEmail) {
        console.log(`Invalid bu_code: ${bu_code}`);
        continue;
      }

      // Susun query secara langsung dengan menyisipkan nilai bu_code
      const query = `
            SELECT TOP 10
            e.name,
            e.email,
            d.bu_code,
            DATENAME(month, d.create_date) AS month,
            DATEPART(year, d.create_date) AS years,
            SUM(d.total_price) AS total_price_sum
            FROM 
            [DX_EXPENSE_PART].[dbo].[EXPENSE_T_SLIP_DETAIL] d
            INNER JOIN 
            [DX_EXPENSE_PART].[dbo].[EXPENSE_M_EMAIL] e
            ON 
            d.bu_code = e.bu_code
            WHERE 
            d.bu_code = '${bu_code}'
            GROUP BY 
            e.name, e.email, d.bu_code, DATENAME(month, d.create_date), DATEPART(year, d.create_date), DATEPART(month, d.create_date)
            ORDER BY 
            e.name, d.bu_code, years, DATEPART(month, d.create_date)`;

      db.query(query, async (err, result) => {
        if (err) {
          console.log(err);
          return; // Gunakan return untuk keluar dari callback fungsi
        }

        try {
          // Pastikan result.recordset adalah array
          const users = result.recordset;
          if (!Array.isArray(users)) {
            throw new Error("Query result is not an array");
          }

          // Gabungkan hasil query menjadi satu pesan
          let emailContent = `<div style="font-family: Calibri, sans-serif; line-height: 1.6; color: #333;">
              <h4 style="color:rgb(18, 32, 224);">Hello,</h4>
              <p>I am DX Administrator,</p>
              <p>You have messages for Expense Part Scrap:</p>
              <table style="width: 100%; border-collapse: collapse;">
              <thead>
                  <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">PIC Name</th>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Month</th>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Year</th>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Total Price</th>
                  </tr>
              </thead>
              <tbody>`;
          for (const user of users) {
            emailContent += `
                  <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${
                    user.name
                  }</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${convertMonthToIndonesian(
                    user.month
                  )}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${
                    user.years
                  }</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${formatRupiah(
                    user.total_price_sum
                  )}</td>
                  </tr>
              `;
          }
          emailContent += `</tbody>
                      </table>
                      <p>For detail activity, you can click to login and access this project:</p>
                      <p><a href='http://localhost:3000/chartBu' style="color:rgb(18, 32, 224); text-decoration: none;">Click here</a></p>
                      <p>Best Regards,</p>
                      <p>DX Admin</p>
                  </div>`;

          const mailOptions = {
            from: '"DX Administrator<No Reply>" <muhammad.effendi.a7j@ap.denso.com>',
            to: recipientEmail,
            subject: "Automated Email",
            html: emailContent,
          };

          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${recipientEmail}`);
        } catch (error) {
          console.log(`Error sending email to ${recipientEmail}: ${error}`);
        }
      });
    }

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.log(`Error fetching email recipients: ${error}`);
    res
      .status(500)
      .json({ message: "Failed to fetch email recipients", error: error });
  }
};
