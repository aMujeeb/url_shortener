
"use client";
import React, { useState } from 'react';

export default function Home() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');

    const handleShortenURL = () => {
        // URL shortening logic - handle in next step
    };

    return (
      <div>
      <h1>URL Shortener</h1>
      <input
          type="text"
          placeholder="Enter your URL"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          onSubmit={handleShortenURL}
      />
      <br></br>
      <button onClick={handleShortenURL}>Shorten</button>
    
      </div>
  );
}
