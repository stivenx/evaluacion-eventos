const mongoose = require('mongoose');




const connectDB = async () => {
  try {
    const connectionString = process.env.MongoDB_URI;
    if (!connectionString) {
      throw new Error('La variable de entorno MongoDB_URI no está definida');
    }
    await mongoose.connect(connectionString.trim());
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(`Error al conectar a la base de datos: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;