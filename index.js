const { MongoClient } = require("mongodb")
const express = require('express')
const app = express()
let db;

app.get('/', async (req, res) => {
  const dumbells = await db.collection("Dumbells").find().toArray();
  console.log(dumbells);
  res.send(`Here are the dumbells : ${dumbells.map(dumbell => dumbell.name)}`)
})

app.get('/admin', (req, res) => {
  res.send('admin')
})

async function start() {
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();
  app.listen(3000);
}

start();


//node js index.js code ?