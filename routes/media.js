const express = require('express');
const Media = require('../models/Media');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Crear
router.post('/', [
  check('serial', 'Serial requerido').not().isEmpty(),
  check('titulo', 'Título requerido').not().isEmpty(),
  check('sinopsis', 'Sinopsis requerida').not().isEmpty(),
  check('url', 'URL requerida').not().isEmpty(),
  check('anioEstreno', 'Año de estreno requerido').isNumeric(),
  check('genero', 'Género requerido').not().isEmpty(),
  check('director', 'Director requerido').not().isEmpty(),
  check('productora', 'Productora requerida').not().isEmpty(),
  check('tipo', 'Tipo requerido').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const media = new Media(req.body);
    const saved = await media.save();
    res.send(saved);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todo
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero')
      .populate('director')
      .populate('productora')
      .populate('tipo');
    res.send(medias);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Actualizar
router.put('/:serial', [
  check('titulo', 'Título requerido').not().isEmpty(),
  check('sinopsis', 'Sinopsis requerida').not().isEmpty(),
  check('url', 'URL requerida').not().isEmpty(),
  check('anioEstreno', 'Año de estreno requerido').isNumeric(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const updated = await Media.findOneAndUpdate(
      { serial: req.params.serial },
      { $set: req.body },
      { new: true }
    );

    if (!updated) return res.status(404).send('Media no encontrada');
    res.send(updated);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

// Eliminar
router.delete('/:serial', async (req, res) => {
  try {
    const deleted = await Media.findOneAndDelete({ serial: req.params.serial });
    if (!deleted) return res.status(404).send('Media no encontrada');
    res.send(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;