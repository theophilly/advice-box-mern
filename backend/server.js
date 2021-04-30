import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import userRoute from './routes/userRoute.js';
import Category from './models/categoryModel.js';
import adviceRoute from './routes/adviceRoute.js';
import { mailValidator } from './validators/index.js';
import { receiveMail } from './controllers/receiveMail.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.egm3f.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log('database conection succesfully'))
  .catch((err) => console.log(err));

app.use('/api/user', userRoute);
app.use('/api', adviceRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'frontend', 'build', 'index.html'));
  });
}

app.post('/api/receivemail', mailValidator, receiveMail);

app.get('/api/advice', async (req, res) => {
  const m = new Category({
    categories: [
      'All',
      'Programming',
      'Education',
      'Finance',
      'Relationships',
      'General',
      'Life',
    ],
  });

  const ewcategories = await m.save();

  // return res.status(200).json({ m, message: 'retrieved' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('app running on port 5000'));
