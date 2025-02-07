import sql from "mssql";

const config = {
  user: "fendi",
  password: "Alhamdulillah12",
  database: "DX_EXPENSE_PART",
  server: "p40160",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const connectDb = async () => {
  try {
    await sql.connect(config);
    console.log("Connection to database successful");
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};

await connectDb();
export default sql;
