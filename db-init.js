const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function run() {
  console.log("Connecting to database...");
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tinfc_class'
  });

  try {
    console.log("Creating tables...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL,
        nama VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'mahasiswa',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log("Inserting admin user...");
    await connection.query(
      "INSERT IGNORE INTO users (username, password, nama, role) VALUES (?, ?, ?, ?)",
      ['admin', hashedPassword, 'Administrator', 'admin']
    );

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await connection.end();
  }
}

run();
