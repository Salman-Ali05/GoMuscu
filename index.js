const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');
const express = require('express');
let db;
const app = express();
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

app.get('/api/admin/create', async (req, res) => {
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

app.get('/api/admin/update/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbell = await db.collection("Dumbells").findOne({ _id: new ObjectId(id) });
  res.render("routes", { dumbell });

  client.close();
});


app.post('/api/admin/update/:id', async (req, res) => {
  const id = req.params.id;
  const { name, price, weight } = req.body;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const result = await db.collection("Dumbells").updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, price, weight } }
  );

  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

app.get('/api/dumbells', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbells = await db.collection("Dumbells").find().toArray();
  res.json(dumbells);

  client.close();
});

app.get('/api/dumbell/:id', async (req, res) => {

  const id = req.params.id;
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbell = await db.collection("Dumbells").findOne({ _id: new ObjectId(id) });
  res.json(dumbell);

  client.close();
});

app.listen(3000);
