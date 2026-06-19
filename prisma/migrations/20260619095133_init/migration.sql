-- CreateTable
CREATE TABLE "RawEvent" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "eventType" TEXT,
    "room" TEXT,
    "guest" TEXT,
    "description" TEXT NOT NULL,
    "status" TEXT,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "room" TEXT,
    "guest" TEXT,
    "status" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueEvidence" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "rawEventId" TEXT NOT NULL,

    CONSTRAINT "IssueEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Handover" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "shiftDate" TIMESTAMP(3) NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Handover_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IssueEvidence" ADD CONSTRAINT "IssueEvidence_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueEvidence" ADD CONSTRAINT "IssueEvidence_rawEventId_fkey" FOREIGN KEY ("rawEventId") REFERENCES "RawEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
