const path = require('path');
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');
const express = require('express');
const multer = require('multer');
let db;
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
    }
  })
});

// CLIENT SIDE

app.get('/', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbells = await db.collection("Dumbells").find().toArray();
  const benches = await db.collection("Benches").find().toArray();
  const rods = await db.collection("Rods").find().toArray();
  const plates = await db.collection("Plates").find().toArray();
  res.render("routes", { dumbells, benches, plates, rods });

  client.close();
})

app.get('/client/dumbell/:id', async (req, res) => {

  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbell = await db.collection("Dumbells").findOne({ _id: new ObjectId(id) });
  // console.log(dumbells);
  res.render("routes", { dumbell });

  client.close();
})

app.get('/client/bench/:id', async (req, res) => {

  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const bench = await db.collection("Benches").findOne({ _id: new ObjectId(id) });
  res.render("routes", { bench });

  client.close();
})

app.get('/client/plate/:id', async (req, res) => {

  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const plate = await db.collection("Plates").findOne({ _id: new ObjectId(id) });
  res.render("routes", { plate });

  client.close();
})

app.get('/client/rod/:id', async (req, res) => {

  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const rod = await db.collection("Rods").findOne({ _id: new ObjectId(id) });
  res.render("routes", { rod });

  client.close();
})

app.get('/user/connect', (req, res) => {
  res.render('routes');
})

app.post('/api/user/login', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const { idd, pass } = req.body;
  const user = await db.collection("Users").findOne({ idd, pass });
  console.log(user, idd, pass);

  if (user) {
    console.log('Alhamdulilah shonen');
    res.json({ redirect: '/admin' });
  } else {
    console.log('Astaghfirullah shonen');
  }

  client.close();
})

// ADMIN SIDE

app.get('/admin', (req, res) => {
  res.render('routes');
});

app.get('/logout', (req, res) => {
  res.render('routes');
})

//DUMBELLS

app.get('/api/admin/createDumbell', async (req, res) => {
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbells = await db.collection("Dumbells").find().toArray();

  res.render("routes", { dumbells });

  client.close();
})

app.post('/api/admin/createDumbell', upload.single('images'), async (req, res) => {
  const { name, price, weight } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = path.join(req.file.filename);
  }

  const client = new MongoClient('mongodb://0.0.0.0:27017/GoMuscu');
  await client.connect();
  db = client.db();

  const result = await db.collection('Dumbells').insertOne({
    name,
    price,
    weight,
    images: imagePath
  });

  if (result) {
    console.log('Alhamdulilah shonen');
    res.json({ redirect: '/admin' });
  } else {
    console.log('Astaghfirullah shonen');
  }

  client.close();
});

app.get('/api/admin/updateDumbell/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const dumbell = await db.collection("Dumbells").findOne({ _id: new ObjectId(id) });
  res.render("routes", { dumbell });

  client.close();
});


app.post('/api/admin/updateDumbell/:id', upload.single('images'), async (req, res) => {
  const id = req.params.id;
  const { name, price, weight } = req.body;
  const image = req.file;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  let updateData = { name, price, weight };

  if (image) {
    updateData.images = image.filename;
  }

  const result = await db.collection("Dumbells").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

app.post('/api/admin/deleteDumbell/:id', async (req, res) => {
  const id = req.params.id;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const result = await db.collection("Dumbells").deleteOne({ _id: new ObjectId(id) });
  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

// FIN DUMBELLS

// BENCHES 

app.get('/api/admin/createBench', async (req, res) => {
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const benches = await db.collection("Benches").find().toArray();

  res.render("routes", { benches });

  client.close();
})

app.post('/api/admin/createBench', upload.single('images'), async (req, res) => {
  const { name, price, weight } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = path.join(req.file.filename);
  }

  const client = new MongoClient('mongodb://0.0.0.0:27017/GoMuscu');
  await client.connect();
  db = client.db();

  const result = await db.collection('Benches').insertOne({
    name,
    price,
    weight,
    images: imagePath
  });

  if (result) {
    console.log('Alhamdulilah shonen');
    res.json({ redirect: '/admin' });
  } else {
    console.log('Astaghfirullah shonen');
  }

  client.close();
});

app.get('/api/admin/updateBench/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const benche = await db.collection("Benches").findOne({ _id: new ObjectId(id) });
  res.render("routes", { benche });

  client.close();
});


app.post('/api/admin/updateBench/:id', upload.single('images'), async (req, res) => {
  const id = req.params.id;
  const { name, price, weight } = req.body;
  const image = req.file;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  let updateData = { name, price, weight };

  if (image) {
    updateData.images = image.filename;
  }

  const result = await db.collection("Benches").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

app.post('/api/admin/deleteBenche/:id', async (req, res) => {
  const id = req.params.id;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const result = await db.collection("Benches").deleteOne({ _id: new ObjectId(id) });
  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

// FIN BENCHES

// PLATES 

app.get('/api/admin/createPlate', async (req, res) => {
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const plates = await db.collection("Plates").find().toArray();

  res.render("routes", { plates });

  client.close();
})

app.post('/api/admin/createPlate', upload.single('images'), async (req, res) => {
  const { name, price, weight } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = path.join(req.file.filename);
  }

  const client = new MongoClient('mongodb://0.0.0.0:27017/GoMuscu');
  await client.connect();
  db = client.db();

  const result = await db.collection('Plates').insertOne({
    name,
    price,
    weight,
    images: imagePath
  });

  if (result) {
    console.log('Alhamdulilah shonen');
    res.json({ redirect: '/admin' });
  } else {
    console.log('Astaghfirullah shonen');
  }

  client.close();
});

app.get('/api/admin/updatePlate/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const plate = await db.collection("Plates").findOne({ _id: new ObjectId(id) });
  res.render("routes", { plate });

  client.close();
});


app.post('/api/admin/updatePlate/:id', upload.single('images'), async (req, res) => {
  const id = req.params.id;
  const { name, price, weight } = req.body;
  const image = req.file;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  let updateData = { name, price, weight };

  if (image) {
    updateData.images = image.filename;
  }

  const result = await db.collection("Plates").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

app.post('/api/admin/deletePlate/:id', async (req, res) => {
  const id = req.params.id;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const result = await db.collection("Plates").deleteOne({ _id: new ObjectId(id) });
  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

// FIN PLATES

// RODS 

app.get('/api/admin/createRod', async (req, res) => {
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const rods = await db.collection("Rods").find().toArray();

  res.render("routes", { rods });

  client.close();
})

app.post('/api/admin/createRod', upload.single('images'), async (req, res) => {
  const { name, price, weight } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = path.join(req.file.filename);
  }

  const client = new MongoClient('mongodb://0.0.0.0:27017/GoMuscu');
  await client.connect();
  db = client.db();

  const result = await db.collection('Rods').insertOne({
    name,
    price,
    weight,
    images: imagePath
  });

  if (result) {
    console.log('Alhamdulilah shonen');
    res.json({ redirect: '/admin' });
  } else {
    console.log('Astaghfirullah shonen');
  }

  client.close();
});

app.get('/api/admin/updateRod/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const rod = await db.collection("Rods").findOne({ _id: new ObjectId(id) });
  res.render("routes", { rod });

  client.close();
});


app.post('/api/admin/updateRod/:id', upload.single('images'), async (req, res) => {
  const id = req.params.id;
  const { name, price, weight } = req.body;
  const image = req.file;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  let updateData = { name, price, weight };

  if (image) {
    updateData.images = image.filename;
  }

  const result = await db.collection("Rods").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

app.post('/api/admin/deleteRod/:id', async (req, res) => {
  const id = req.params.id;

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const result = await db.collection("Rods").deleteOne({ _id: new ObjectId(id) });
  if (result) {
    console.log("Alhamdulilah shonen");
    res.json({ redirect: "/admin" });
  } else {
    console.log("Astaghfirullah shonen");
  }

  client.close();
});

// FIN RODS

// API OF THE PROJECT

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

app.get('/api/benches', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const benches = await db.collection("Benches").find().toArray();
  res.json(benches);

  client.close();
});

app.get('/api/bench/:id', async (req, res) => {

  const id = req.params.id;
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const bench = await db.collection("Benches").findOne({ _id: new ObjectId(id) });
  res.json(bench);

  client.close();
});

app.get('/api/rods', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const rods = await db.collection("Rods").find().toArray();
  res.json(rods);

  client.close();
});

app.get('/api/rod/:id', async (req, res) => {

  const id = req.params.id;
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const rod = await db.collection("Rods").findOne({ _id: new ObjectId(id) });
  res.json(rod);

  client.close();
});

app.get('/api/plates', async (req, res) => {

  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const plates = await db.collection("Plates").find().toArray();
  res.json(plates);

  client.close();
});

app.get('/api/plate/:id', async (req, res) => {

  const id = req.params.id;
  const client = new MongoClient("mongodb://0.0.0.0:27017/GoMuscu");
  await client.connect();
  db = client.db();

  const plate = await db.collection("Plates").findOne({ _id: new ObjectId(id) });
  res.json(plate);

  client.close();
});

app.listen(3000);
