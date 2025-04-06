const express = require('express');
const Tipo = require('../models/Tipo');
const { check, validationResult } = require('express-validator');

const router = express.Router();

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

    const tipo = new Tipo(req.body);
    const savedTipo = await tipo.save();
    res.send(savedTipo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.send(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

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
      {
        $set: {
          nombre: req.body.nombre,
          estado: req.body.estado,
          descripcion: req.body.descripcion,
        },
      },
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