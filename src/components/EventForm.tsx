'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function EventForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create event');
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      setImage(null);
      setPreview(null);
    } catch {
      console.error('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={300}
          height={200}
          className="object-cover"
        />
      )}
      <button type="submit">Create Event</button>
    </form>
  );
}