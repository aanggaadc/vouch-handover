import { prisma } from '../db/prisma';

export class RawEventRepository {
  async createMany(events: any[]) {
    return prisma.rawEvent.createMany({
      data: events,
      skipDuplicates: true
    });
  }

  async findAll() {
    return prisma.rawEvent.findMany({
      orderBy: {
        eventTime: 'asc'
      }
    });
  }
}

export const rawEventRepository =
  new RawEventRepository();