require('dotenv').config();
const express = require('express');
const route = require('./routers/store');

const app = express();
app.use(express.json());
app.use(route);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
