import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "./db.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const sessions = new Map();

/* REGISTER */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).end();

  const hash = await bcrypt.hash(password, 12);

  db.run(
    "INSERT INTO users VALUES (?, ?)",
    [username, hash],
    err => err ? res.status(409).end() : res.json({ ok: true })
  );
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, row) => {
      if (!row) return res.status(401).end();

      const valid = await bcrypt.compare(password, row.password_hash);
      if (!valid) return res.status(401).end();

      const token = uuid();
      sessions.set(token, username);

      res.json({ token });
    }
  );
});

/* SESSION CHECK */
app.get("/session", (req, res) => {
  const token = req.headers.authorization;
  sessions.has(token) ? res.json({ ok: true }) : res.status(401).end();
});

app.listen(3000, () => {
  console.log("Kensano auth server running on port 3000");
});
