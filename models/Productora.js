const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true // evita duplicados
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    required: true
  },
  descripcion: {
    type: String,
    required: false
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

// ✅ Actualizar automáticamente la fecha de actualización al editar
productoraSchema.pre('findOneAndUpdate', function (next) {
  this.set({ fechaActualizacion: new Date() });
  next();
});

module.exports = mongoose.model('Productora', productoraSchema);
