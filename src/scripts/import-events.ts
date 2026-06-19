import fs from 'fs';
import path from 'path';

import { rawEventRepository } from '../repositories/raw-event.repository';

async function run() {
  const filePath = path.join(
    process.cwd(),
    'data',
    'events.json'
  );

  const content = fs.readFileSync(
    filePath,
    'utf-8'
  );

  const json = JSON.parse(content);

  const events = json.events.map((event: any) => ({
    id: event.id,

    hotelId: json.hotel.id,

    sourceType: 'json',

    eventType: event.type,

    room: event.room,

    guest: event.guest,

    description: event.description,

    status: event.status,

    eventTime: new Date(event.timestamp),

    payload: event
  }));

  await rawEventRepository.createMany(events);

  console.log(
    `Imported ${events.length} events`
  );
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });