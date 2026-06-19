import express from 'express';
import cors from 'cors';

import { handoverRouter } from './routes/handover.route';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/handover', handoverRouter);

export default app;