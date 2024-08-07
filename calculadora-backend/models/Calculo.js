const mongoose = require('mongoose');

const CalculoSchema = new mongoose.Schema({
  operacion: String,
  resultado: Number,
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Calculo', CalculoSchema);
