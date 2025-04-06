// models/Director.js

const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

directorSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: Date.now() });
  next();
});

module.exports = mongoose.model('Director', directorSchema);