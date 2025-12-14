import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./kensano.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      password_hash TEXT
    )
  `);
});
