import cron from "node-cron";
import { sendEmailRev } from "./email.js";

// Atur cron job untuk menjalankan fungsi sendEmailRev setiap hari Kamis jam 10 pagi
cron.schedule("0 10 * * 4", async () => {
  try {
    await sendEmailRev();
    console.log("Cron job executed successfully");
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});
