import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Test12345.',
  database: 'empresa_db',
});

export default db;
