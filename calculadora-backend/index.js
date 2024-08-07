const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // <-- Añadir esta línea

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // <-- Añadir esta línea

mongoose.connect('mongodb://localhost:27017/calculadora', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const calculadoraRoutes = require('./routes/calculadora');
app.use('/api', calculadoraRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
