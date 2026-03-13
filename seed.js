const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'tinfc_class',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
  });

  try {
    const [rows] = await connection.execute("SELECT * FROM users WHERE username = 'admin'");
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.execute(
        "INSERT INTO users (username, password, nama, role) VALUES (?, ?, ?, ?)",
        ['admin', hashedPassword, 'Administrator', 'admin']
      );
      console.log("Default user 'admin' created with password 'admin123'");
    } else {
      console.log("User 'admin' already exists");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
    process.exit();
  }
}

seed();
