const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
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

productoraSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

module.exports = mongoose.model('Productora', productoraSchema);
