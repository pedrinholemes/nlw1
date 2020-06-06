const express = require('express')
const server = express()
const db = require('./database/db')

server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
console.log('\x1b[34m[server]> Initialized\x1b[0m')

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

server.get('/', (req, res) => {
  return res.render('index.html')
})
server.get('/create-point', (req, res) => {
  return res.render('create-point.html')
})
server.get('/search', (req, res) => {
  const querySearch = req.query.search
  db.all(`SELECT * FROM places WHERE city = '${querySearch}'`,(err,rows)=>{
    if(err){
      return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
    }
    const total = rows.length
    console.log('\x1b[36m[database] dados Requisitados\x1b[0m')
    console.log('\x1b[36m[query]'+ querySearch +'\x1b[0m')
    return res.render('search-results.html',{places:rows, total})
  })

})
server.get('/points', (req, res) => {
  db.all(`SELECT * FROM places`,(err,rows)=>{
    if(err){
      return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
    }
    const total = rows.length
    console.log('\x1b[36m[database] dados Requisitados\x1b[0m')
    return res.render('search-results.html',{places:rows, total})
  })

})
server.post('/savepoint', (req,res) =>{
  const { name, image, address, address2, state, city, items} =  req.body
  const query = `
    INSERT INT places (
      name,
      image,
      address,
      address2,
      state,
      city,
      items) VALUES (?,?,?,?,?,?,?);
  `;
  const values = [
    name,
    image,
    address,
    address2,
    state,
    city,
    items
  ]
  console.log(values)
  function afterInsertData(err){
    if(err){
      console.log('\x1b[31m[Database]' + err + '\x1b[0m')
      return res.render('create-point.html', {error:true})
    }
    console.log('\x1b[32m[Database]Cadastrado com Sucesso\x1b[0m')
    console.log(this)
    return res.render('create-point.html', {saved:true})
  }
  db.run(query, values, afterInsertData) 
})
server.get('/list',(req,res)=>{
  db.all(`SELECT * FROM places`,(err,rows)=>{
    if(err){
      return console.log('\x1b[31m[Database]' + err + '\x1b[0m')
    }
    const total = rows.length
    console.log('\x1b[36m[database] dados Requisitados\x1b[0m')
    console.log(rows)
    return res.json({places:rows, total})
  })
})
server.listen(3000)