import express from 'express';
import cors from 'cors';

import { handoverRouter } from './routes/handover.route';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Handover API is running 🚀',
  });
});
app.use('/api/handover', handoverRouter);

export default app;