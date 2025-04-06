const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
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

generoSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

module.exports = mongoose.model('Genero', generoSchema);