const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('./database');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`server up on port: ${port}`);
});
