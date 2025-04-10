const express = require('express');
const Tipo = require('../models/Tipo');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Crear nuevo tipo
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

    // Verificar si ya existe un tipo con el mismo nombre
    const existe = await Tipo.findOne({ nombre: req.body.nombre });
    if (existe) {
      return res.status(400).json({ message: 'Ya existe un tipo con ese nombre' });
    }

    const tipo = new Tipo(req.body);
    const savedTipo = await tipo.save();
    res.send(savedTipo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find(); // o .find({ estado: 'Activo' }) si solo quieres los activos
    res.send(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar tipo por nombre
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

    const tipoActualizado = await Tipo.findOneAndUpdate(
      { nombre: req.params.nombre },
      { $set: req.body },
      { new: true }
    );

    if (!tipoActualizado) {
      return res.status(404).send('Tipo no encontrado');
    }

    res.send(tipoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar tipo por nombre
router.delete('/:nombre', async (req, res) => {
  try {
    const tipoEliminado = await Tipo.findOneAndDelete({ nombre: req.params.nombre });
    if (!tipoEliminado) {
      return res.status(404).send('Tipo no encontrado');
    }
    res.send(tipoEliminado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;