import mongoose from 'mongoose';
import express from 'express';

const app = express();

const port = '8080';

mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => process.stdout.write('MongoDB connected!\n'))
  .catch(err => process.stdout.write(err));

app.listen(port, () => process.stdout.write(`Listening on port ${port}\n`));
