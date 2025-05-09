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

const eventsPath = path.join(process.cwd(), 'data', 'all_events.json');

export async function getEvents(): Promise<Event[]> {
  try {
    const data = await fs.readFile(eventsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading events:', error);
    return [];
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  const events = await getEvents();
  return events.find(event => event.id === id) || null;
}