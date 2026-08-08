import db from "../config/db.js";

async function findByEmail(email) {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
}

// Find user by ID
async function findById(id) {
  const [rows] = await db.execute(
    "SELECT id, name, email, created_at FROM users WHERE id = ?",
    [id],
  );

  return rows[0];
}

// Create user
async function create(name, email, password) {
  const [result] = await db.execute(
    `INSERT INTO users
       (name, email, password)
       VALUES (?, ?, ?)`,
    [name, email, password],
  );

  return {
    id: result.insertId,
    name,
    email,
  };
}

// Check if email exists
async function exists(email) {
  const [rows] = await db.execute("SELECT id FROM users WHERE email = ?", [
    email,
  ]);

  return rows.length > 0;
}

export default { findByEmail, findById, create, exists };
