import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

// Updated path to point to data folder outside src
const eventsPath = path.join(process.cwd(), 'data', 'all_events.json');

export async function POST(req: NextRequest) {
  try {
    // Ensure directories exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const dataDir = path.join(process.cwd(), 'data');
    
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
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
    if (image && image.size > 0) {
      const ext = path.extname(image.name);
      const uniqueFilename = `${uuidv4()}${ext}`;
      imagePath = `/uploads/${uniqueFilename}`;
      
      const bytes = await image.arrayBuffer();
      await fs.writeFile(
        path.join(uploadsDir, uniqueFilename),
        Buffer.from(bytes)
      );
    }

    // Initialize events array
    let existingEvents = [];
    try {
      const fileContent = await fs.readFile(eventsPath, 'utf-8');
      existingEvents = JSON.parse(fileContent);
    } catch {
      console.log('Creating new events file');
      await fs.writeFile(eventsPath, '[]'); // Initialize with empty array
    }

    // Create and save new event
    const newEvent = {
      id: uuidv4(),
      title,
      date,
      location,
      description,
      image: imagePath,
    };

    const updatedEvents = [...existingEvents, newEvent];
    await fs.writeFile(eventsPath, JSON.stringify(updatedEvents, null, 2));

    return NextResponse.json(newEvent, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}