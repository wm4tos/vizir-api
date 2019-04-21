import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import routes from './routes/index';

dotenv.config();

const app = express();

const port = process.env.PORT || '8080';

mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => process.stdout.write('MongoDB connected!\n'))
  .catch(err => process.stdout.write(err));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => process.stdout.write(`Listening on port ${port}\n`));

export default app;
