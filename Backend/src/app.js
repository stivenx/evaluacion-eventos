const express = require('express');
const cors = require('cors');
const costUserRoutes = require('./routes/routesUsers');
const costEventRoutes = require('./routes/routesEvents');


const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/users', costUserRoutes);
app.use('/api/events', costEventRoutes);





module.exports = app;