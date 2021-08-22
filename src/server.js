const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`server up on port: ${port}`);
});
