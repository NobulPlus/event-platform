import { promises as fs } from 'fs';
   import path from 'path';

   export interface Event {
     id: string;
     title: string;
     date: string;
     location: string;
     description: string;
     image: string;
   }

   export async function getEvents(): Promise<Event[]> {
     const eventsPath = path.join(process.cwd(), 'data', 'events.json');
     const data = await fs.readFile(eventsPath, 'utf-8');
     return JSON.parse(data);
   }