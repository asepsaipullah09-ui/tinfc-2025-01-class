import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password_anda",
  database: "tinfc_class",
  port: 5432,
});

export default pool;
