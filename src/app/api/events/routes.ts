import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const eventsPath = path.join(process.cwd(), 'src', 'data', 'all_events.json');

export async function POST(req: NextRequest) {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    const formData = await req.formData();
    
    // Validate required fields
    const title = formData.get('title')?.toString();
    const date = formData.get('date')?.toString();
    const location = formData.get('location')?.toString();
    const description = formData.get('description')?.toString();
    const image = formData.get('image') as File | null;

    if (!title || !date || !location || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Handle image upload
    let imagePath = '/default-event.jpg';
    if (image?.size) {
      const ext = path.extname(image.name);
      const uniqueFilename = `${uuidv4()}${ext}`;
      imagePath = `/uploads/${uniqueFilename}`;
      
      const bytes = await image.arrayBuffer();
      await fs.writeFile(
        path.join(uploadsDir, uniqueFilename),
        Buffer.from(bytes)
      );
    }

    // Create new event
    const newEvent = {
      id: uuidv4(),
      title,
      date,
      location,
      description,
      image: imagePath,
    };

    // Update events data
    let existingEvents = [];
    try {
      const fileContent = await fs.readFile(eventsPath, 'utf-8');
      existingEvents = JSON.parse(fileContent);
    } catch {
      console.log('Initializing new events file');
    }

    const updatedEvents = [...existingEvents, newEvent];
    await fs.writeFile(eventsPath, JSON.stringify(updatedEvents, null, 2));

    return NextResponse.json(newEvent, { status: 201 });

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}