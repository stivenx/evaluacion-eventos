const app = require("./app");
const connectDB = require("./configDB/db");
const port = process.env.PORT || 5000;

const dotenv = require('dotenv');

dotenv.config();
connectDB();

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});