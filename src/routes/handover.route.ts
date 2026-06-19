import { Router } from 'express';

const router = Router();

router.post('/', async (_req, res) => {
  return res.json({
    message: 'handover endpoint'
  });
});

export const handoverRouter = router;