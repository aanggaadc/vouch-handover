import { prisma } from "../db/prisma";

export class IssueRepository {
  async findOpenIssue(hotelId: string, category: string, room?: string | null) {
    return prisma.issue.findFirst({
      where: {
        hotelId,
        category,
        room: room ?? null,
        status: {
          not: "RESOLVED",
        },
      },
    });
  }

  async findOpenIssues() {
    return prisma.issue.findMany({
      where: {
        status: "OPEN",
      },

      include: {
        evidences: true,
      },

      orderBy: {
        openedAt: "asc",
      },
    });
  }

  async findByKey(key: string) {
    return prisma.issue.findUnique({
      where: { key },
    });
  }

  async findResolvedIssues() {
    return prisma.issue.findMany({
      where: {
        status: "RESOLVED",
      },

      include: {
        evidences: true,
      },
    });
  }

  async create(data: any) {
    return prisma.issue.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return prisma.issue.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return prisma.issue.findMany();
  }
}

export const issueRepository = new IssueRepository();
