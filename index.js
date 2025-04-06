const express = require('express');
const { getConnection } = require('./config/bd');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/director', require('./routes/director'));
app.use('/genero', require('./routes/genero'));
app.use('/media', require('./routes/media'));
app.use('/productora', require('./routes/productora'));
app.use('/tipo', require('./routes/tipo'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión a MongoDB establecida');
  
  app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
  });
})
.catch(err => {
  console.error('Error al conectar a MongoDB:', err);
  process.exit(1);
});

getConnection();
