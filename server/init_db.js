const sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database("sqliteDB");

db.run(`CREATE TABLE IF NOT EXISTS user (
    id integer PRIMARY KEY, 
    name text, 
    email text UNIQUE, 
    user_pass text,
    is_admin integer)`);