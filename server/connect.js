import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config();
export const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})
function handleDisconnect() {
    db.connect(function(err) {
      if(err) { 
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }
    });
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();
      } else {
        throw err;
      }
    });
  }
  
  handleDisconnect();