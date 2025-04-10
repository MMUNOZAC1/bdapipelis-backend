const express = require('express');
const Productora = require('../models/Productora');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Crear productora
router.post('/', [
  check('nombre', 'nombre inválido').not().isEmpty(),
  check('estado', 'estado inválido').isIn(['Activo', 'Inactivo']),
  check('descripcion', 'descripción inválida').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const productora = new Productora(req.body);
    const savedProductora = await productora.save();
    res.send(savedProductora);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todas las productoras
router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.send(productoras);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// ✅ Nueva ruta: Obtener solo las productoras activas
router.get('/activos', async (req, res) => {
  try {
    const activas = await Productora.find({ estado: 'Activo' });
    res.json(activas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar productora por nombre
router.put('/:nombre', [
  check('nombre', 'nombre inválido').not().isEmpty(),
  check('estado', 'estado inválido').isIn(['Activo', 'Inactivo']),
  check('descripcion', 'descripción inválida').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const updated = await Productora.findOneAndUpdate(
      { nombre: req.params.nombre },
      {
        $set: {
          nombre: req.body.nombre,
          estado: req.body.estado,
          descripcion: req.body.descripcion,
        },
      },
      { new: true }
    );

    if (!updated) return res.status(404).send('Productora no encontrada');
    res.send(updated);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar productora por nombre
router.delete('/:nombre', async (req, res) => {
  try {
    const deleted = await Productora.findOneAndDelete({ nombre: req.params.nombre });
    if (!deleted) return res.status(404).send('Productora no encontrada');
    res.send(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;