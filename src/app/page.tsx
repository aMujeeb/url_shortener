"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { inputValidate } from './utils/stringutils';
import { ShortenedItemsList } from './components/storeitems';
import { ErrorMessage } from './components/errorlabel';
import Button from './components/button';
import InputText from './components/inputText';
import { deleteShortenedURL, getShortenedURLs, shortenURL } from './services/urlservices';

export default function Home() {

  const [originalURL, setOriginalURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [shortenedURLs, setShortenedURL] = useState<UrlShorter[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  const router = useRouter();

  useEffect(() => {
    requestSavedItems();
  }, []
  );

  const handleShortenURL = async () => {

    if (!inputValidate(originalURL)) {
      setErrorMessage('Wrong format given');
      return;
    }

    setErrorMessage('');

    try {

      setLoading(true);

      const { data, status } = await shortenURL(originalURL, description);

      if (status === 201) {
        setErrorMessage(data);
      } else {
        requestSavedItems();
      }
    } catch (err) {
      setErrorMessage('Error Saving New URL: ' + originalURL);
    } finally {
      setLoading(false);
    }
  };

  const requestSavedItems = async () => {
    try {
      const response = await getShortenedURLs()
      setShortenedURL(response.data);
    } catch (err) {
      setErrorMessage('Error fetching products:');
    } finally {
      setOriginalURL('');
      setDescription('');
    }
  };

  const redirectToPage = async (url: String) => {
    if (url === '') {
      return
    }

    router.push(`/redirects/${url.toString().trim()}`);
  }

  const deleteSavedEntryPage = async (url: String) => {
    if (url === '') {
      return
    }
    try {

      const response = await deleteShortenedURL(url)
      const { data, status_code } = response.data
      if (status_code === 201) {
        setErrorMessage(data);
      } else {
        requestSavedItems();
      }
    } catch (err) {
      setErrorMessage('Error on Redirection');
    } finally {
      setShortURL('');
    }
  }

  return (
    <div className="container">

      <InputText
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
        placeholder="Enter your URL"
        disabled={loading}
      />

      <InputText
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description(optional)"
        disabled={loading}
      />

      <Button callBackValue={''} onButtonClick={handleShortenURL} loading={loading}>
        Shorten Url
      </Button>

      <h2 className="w-full text-l text-red-800 text-xl mt-4">Search By Short Url</h2>

      <InputText
        disabled={loading}
        placeholder="Enter Short Url"
        value={shortURL}
        onChange={(e) => setShortURL(e.target.value)}
      />

      <Button callBackValue={shortURL} onButtonClick={redirectToPage} loading={loading}>
        Search & Navigate
      </Button>

      <ErrorMessage message={errorMessage} />

      <ShortenedItemsList shortenedURLs={shortenedURLs} onDeleteButtonClick={deleteSavedEntryPage} onOpenButtonClick={redirectToPage} />

    </div >
  );
}