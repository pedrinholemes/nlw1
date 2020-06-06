const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db;
// db.serialize(()=>{
//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items) VALUES (?,?,?,?,?,?,?);
//   `;
//   const values = [
//     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "Número 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis e Papelão"
//   ]
//   function afterInsertData(err){
//     if(err){
//       return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
//     }
//     console.log('\x1b[32m[Database]Cadastrado com Sucesso\x1b[0m')
//   }
//   //db.run(query, values, afterInsertData)
// })
/*
db.serialize(()=>{
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items) VALUES (?,?,?,?,?,?,?);
  `;
  const values = [
    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "Papersider",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Santa Catarina",
    "Rio do Sul",
    "Papéis e Papelão"
  ]
  function afterInsertData(err){
    if(err){
      return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
    }
    console.log('\x1b[32m[Database]Cadastrado com Sucesso\x1b[0m')
  }
  function afterDeleteData(err){
    if(err){
      return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
    }
    console.log('\x1b[32m[Database]Deletado com Sucesso\x1b[0m')
  }
  function afterSelectData(err,rows){
    if(err){
      return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
    }
    console.log('\x1b[32m[Database]Aqui estão seus dados\x1b[0m')
    console.log(rows)
  }
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);

  db.run(query, values, afterInsertData)
  db.all(`SELECT * FROM places`, afterSelectData)

  db.run(`DELETE FROM places WHERE id = ?`, [1],afterDeleteData)
  })
*/