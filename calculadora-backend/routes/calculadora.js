const express = require('express');
const router = express.Router();
const Calculo = require('../models/Calculo');

const realizarOperacion = (operacion, num1, num2 = null) => {
  switch (operacion) {
    case 'suma': return num1 + num2;
    case 'resta': return num1 - num2;
    case 'multiplicacion': return num1 * num2;
    case 'division': return num1 / num2;
    case 'potencia': return Math.pow(num1, num2);
    case 'raiz': return Math.sqrt(num1);
    default: return null;
  }
};

router.get('/calcular', async (req, res) => {
  const operacion = req.headers['operacion'];
  const num1 = parseFloat(req.headers['num1']);
  const num2 = parseFloat(req.headers['num2']);
  
  const resultado = realizarOperacion(operacion, num1, num2);

  if (resultado !== null) {
    const nuevoCalculo = new Calculo({ operacion, resultado });
    await nuevoCalculo.save();
    res.status(200).send({ operacion, resultado }); // Asegúrate de enviar la operación también
  } else {
    res.status(400).send({ error: 'Operación no válida' });
  }
});

module.exports = router;
