const sqlite3 = require('sqlite3').verbose();

async function init_db() {
   try{ 
    let db = new sqlite3.Database(process.env.Database);
    await db.run(`CREATE TABLE IF NOT EXISTS user (
    id integer PRIMARY KEY, 
    name text, 
    email text UNIQUE, 
    user_pass text,
    is_admin integer)`);

    await db.run(`CREATE TABLE IF NOT EXISTS bets (
   bet_id integer PRIMARY KEY, 
   user_id integer, 
   title text, 
   type text, 
   stakes REAL,
   winnings REAL,
   profits REAL,
   date_placed text)`);

    await db.run(`CREATE TABLE IF NOT EXISTS d2w (
   bet_id integer PRIMARY KEY, 
   teamA_amount text, 
   teamA_odds text, 
   teamB_amount text,
   teamB_odds text,
   profits text,
   result text
   )`);

    await db.run(`CREATE TABLE IF NOT EXISTS d3w (
   bet_id integer PRIMARY KEY, 
   teamA_amount text, 
   teamA_odds text, 
   teamB_amount text,
   teamB_odds text,
   draw_amount text,
   draw_odds text,
   profits text,
   result text
   )`);
   console.log('Successfully created db ...')
    }catch(er){
        console.log(er);
    }
}

init_db();