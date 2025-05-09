'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EventForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image must be less than 2MB');
        return;
      }
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '28rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div>
        <label
          htmlFor="title"
          style={{
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#1f2937',
          }}
        >
          Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      <div>
        <label
          htmlFor="date"
          style={{
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#1f2937',
          }}
        >
          Date*
        </label>
        <input
          type="date"
          id="date"
          name="date"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      <div>
        <label
          htmlFor="location"
          style={{
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#1f2937',
          }}
        >
          Location*
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          style={{
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#1f2937',
          }}
        >
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            outline: 'none',
            resize: 'vertical',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      <div>
        <label
          htmlFor="image"
          style={{
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: '500',
            color: '#1f2937',
          }}
        >
          Event Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
          }}
        />
        {preview && (
          <div style={{ marginTop: '0.5rem' }}>
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={200}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '200px',
                borderRadius: '0.375rem',
              }}
            />
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: '0.5rem',
            color: '#ef4444',
            backgroundColor: '#fef2f2',
            borderRadius: '0.375rem',
          }}
        >
          Error: {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          color: 'white',
          backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }
        }}
        onMouseOut={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }
        }}
      >
        {isSubmitting ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
}