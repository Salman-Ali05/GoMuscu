const { MongoClient } = require("mongodb")
const express = require('express')
let db;
const app = express()
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());

app.get('/', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();
  
  const dumbells = await db.collection("Dumbells").find().toArray();
  console.log(dumbells);
  res.render("routes", { dumbells });

  client.close();
})

app.get('/api/admin', async (req, res) => {
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbells = await db.collection("Dumbells").find().toArray();

  res.render("routes", { dumbells });

  client.close();
})

app.post('/api/admin/create', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  console.log(req.body);
  const result = await db.collection("Dumbells").insertOne(req.body);
  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
})

app.get('/api/dumbells', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbells = await db.collection("Dumbells").find().toArray();
  res.json(dumbells);

  client.close();
});

app.listen(3000);
