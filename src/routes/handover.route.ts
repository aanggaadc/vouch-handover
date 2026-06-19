import { Router } from 'express';

import {
  handoverController
} from '../controllers/handover.controller';

const router = Router();

router.post(
  '/',
  handoverController.generate
);

export const handoverRouter =
  router;