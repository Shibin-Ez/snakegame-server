import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

const pool = mysql
  .createPool({
    host: "mysql-snakegame-ezshibin-snakegame.a.aivencloud.com",
    user: "avnadmin",
    password: process.env.DBPASS,
    database: "defaultdb",
    port: 25185,
  })
  .promise();

export default pool;
