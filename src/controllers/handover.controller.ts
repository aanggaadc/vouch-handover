import { Request, Response }
  from 'express';

import {
  handoverService
} from '../services/handover.service';

import { ManagerHandoverService } from "../services/manager-handover.service";

const managerFormatter =
  new ManagerHandoverService();

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

  async generateManagerHandover(
   req: Request,
  res: Response
) {
  const handover =
    await handoverService.generate(req.body.hotelId);

  const report =
    managerFormatter.format(handover);

  res.setHeader(
    "Content-Type",
    "text/plain; charset=utf-8"
  );

  return res.send(report);
}
}

export const handoverController =
  new HandoverController();