import { Router } from 'express';

import {
  handoverController
} from '../controllers/handover.controller';

const router = Router();

router.post(
  '/',
  handoverController.generate
);

router.post(
  "/manager",
  handoverController.generateManagerHandover
);

export const handoverRouter =
  router;