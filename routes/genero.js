const express = require('express');
const Genero = require('../models/Genero');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Crear género
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

    const genero = new Genero(req.body);
    const savedGenero = await genero.save();
    res.send(savedGenero);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todos los géneros
router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find();
    res.send(generos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// ✅ NUEVA RUTA: Obtener solo los géneros activos
router.get('/activos', async (req, res) => {
  try {
    const generosActivos = await Genero.find({ estado: 'Activo' });
    res.send(generosActivos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar género
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

    const generoActualizado = await Genero.findOneAndUpdate(
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

    if (!generoActualizado) {
      return res.status(404).send('Género no encontrado');
    }

    res.send(generoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar género
router.delete('/:nombre', async (req, res) => {
  try {
    const generoEliminado = await Genero.findOneAndDelete({ nombre: req.params.nombre });
    if (!generoEliminado) {
      return res.status(404).send('Género no encontrado');
    }
    res.send(generoEliminado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
