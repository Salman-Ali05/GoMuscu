const { MongoClient } = require("mongodb")
const express = require('express')
let db;
const app = express()
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get('/', async (req, res) => {
  const dumbells = await db.collection("Dumbells").find().toArray();
  console.log(dumbells);
  res.render("home", { dumbells });
})

app.get('/admin', (req, res) => {
  res.render("admin");
})

app.post('/admin/create', (req, res) => {
  res.render("admin", { req });
})

async function start() {
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();
  app.listen(3000);
}

start();
