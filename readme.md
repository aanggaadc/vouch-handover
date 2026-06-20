# Vouch Night Shift Handover Service

A Node.js service that generates an action-oriented morning handover from a combination of structured hotel events and free-text night logs.

The goal is to help morning managers quickly understand:

* What still requires action
* What was resolved overnight
* What is new from the latest shift

All generated handover items maintain references back to their original source data.

---

## Features

* Ingest structured operational events
* Parse free-text night logs
* Reconcile related events into issues
* Generate action-first handovers
* Preserve source traceability
* Structured logging for debugging and operations

---

## Tech Stack

* Node.js
* Express
* TypeScript
* Prisma
* PostgreSQL (supabase)

---

## Local Development

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file:

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
PORT=3000
GEMINI_API_KEY=your-api-key
```

### Run Database Migrations

```bash
npx prisma migrate deploy
```

### Start Development Server

```bash
npm run dev
```

Server will start on:

```text
http://localhost:3000
```

---

## API

### Generate Handover

Generate a morning handover for a hotel.

#### Endpoint

```http
POST /api/handover
```

#### Request Body

```json
{
  "hotelId": "lumen-sg"
}
```

#### Example Response

```json
{
  "actionRequired": [
    {
      "title": "Room 112 AC issue remains unresolved",
      "sources": ["evt_0002", "evt_0018"]
    }
  ],
  "newlyResolved": [],
  "fyi": []
}
```

---

## Sample Curl Command

### Local Environment

```bash
curl -X POST http://localhost:3000/api/handover \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "lumen-sg"
  }'
```

### Deployed Environment

Replace `https://vouch-handover-phi.vercel.app/` with the deployed service URL.

```bash
curl -X POST https://vouch-handover-phi.vercel.app/api/handover \
  -H "Content-Type: application/json" \
  -d '{
    "hotelId": "lumen-sg"
  }'
```

---

## Project Structure

```text
src/
├── controllers/
├── routes/
├── services/
├── repositories/
├── utils/

prisma/
├── schema.prisma

data/
├── events.json
└── night-logs.md
```

---

## Design Notes

This implementation prioritizes:

1. Grounded outputs
2. Traceable evidence
3. Deterministic reconciliation
4. Actionable handovers

Additional implementation details and tradeoffs can be found in:

* DECISIONS.md
* agent.md
