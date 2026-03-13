import pool from "./lib/db";

async function checkUsers() {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    console.log("Users:", JSON.stringify(rows, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

checkUsers();
