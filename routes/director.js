const express = require('express');
const Director = require('../models/Director');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post('/', [
  check('nombres', 'Nombre inválido').not().isEmpty(),
  check('estado', 'Estado inválido').isIn(['Activo', 'Inactivo'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const director = new Director(req.body);
    const savedDirector = await director.save();
    res.json(savedDirector);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

router.get('/', async (req, res) => {
  try {
    const directores = await Director.find();
    res.json(directores);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

router.put('/:id', [
  check('nombres', 'Nombre inválido').not().isEmpty(),
  check('estado', 'Estado inválido').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const updatedDirector = await Director.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDirector);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;