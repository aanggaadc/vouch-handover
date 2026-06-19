import { Request, Response }
  from 'express';

import {
  handoverService
} from '../services/handover.service';

export class HandoverController {
  async generate(
    req: Request,
    res: Response
  ) {
    const { hotelId } =
      req.body;

    const handover =
      await handoverService.generate(
        hotelId
      );

    return res.json(handover);
  }
}

export const handoverController =
  new HandoverController();