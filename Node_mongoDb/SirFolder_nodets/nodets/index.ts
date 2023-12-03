import express from 'express';
import router from './Route/index';
const bp = require('body-parser'); //add


const app = express();

app.use(bp.json()) //add
app.use(bp.urlencoded({ extended: true })) //add
app.use(router);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});