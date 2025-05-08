import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract fields
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File | null;

    if (!title || !date || !location || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imagePath = '/uploads/default-event.jpg';
    if (image) {
      const fileName = `${uuidv4()}-${image.name}`;
      const filePath = join(process.cwd(), 'public', 'uploads', fileName);
      const buffer = Buffer.from(await image.arrayBuffer());
      writeFileSync(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const event = {
      id: uuidv4(),
      title,
      date,
      location,
      description,
      image: imagePath,
    };

    // Read existing events
    const eventsPath = join(process.cwd(), 'data', 'events.json');
    const events = JSON.parse(readFileSync(eventsPath, 'utf-8'));
    events.push(event);
    writeFileSync(eventsPath, JSON.stringify(events, null, 2));

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json({ error: 'Failed to process form' }, { status: 500 });
  }
}