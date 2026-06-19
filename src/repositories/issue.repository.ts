import { prisma } from '../db/prisma';

export class IssueRepository {
  async findOpenIssue(
    hotelId: string,
    category: string,
    room?: string | null
  ) {
    return prisma.issue.findFirst({
      where: {
        hotelId,
        category,
        room: room ?? null,
        status: {
          not: 'RESOLVED'
        }
      }
    });
  }

  async create(data: any) {
    return prisma.issue.create({
      data
    });
  }

  async update(id: string, data: any) {
    return prisma.issue.update({
      where: { id },
      data
    });
  }

  async findAll() {
    return prisma.issue.findMany();
  }
}

export const issueRepository =
  new IssueRepository();