// models/Tipo.js

const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

tipoSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

module.exports = mongoose.model('Tipo', tipoSchema);
