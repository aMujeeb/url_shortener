"use client";

import React, { useEffect, useState, useRef } from 'react';
//import { useRouter } from 'next/navigation';
import axios from 'axios';
import { inputValidate } from './utils/stringutils';
import { ShortenedItemsList } from './components/storeitems';
import { ErrorMessage } from './components/errorlabel';
import Button from './components/button';
import InputText from './components/inputText';
import Link from 'next/link';


const URL_SHORTENED_ENDPOINT = "api/url/shorten";
const URL_REDIRECT_ENDPOINT = "api/url/redirect";

export default function Home() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [originalURL, setOriginalURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [shortenedURLs, setShortenedURL] = useState<UrlShorter[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    requestSavedItems();
  }, []
  );

  useEffect(() => {
    if (redirecting) {
      // Ensure the router is mounted before pushing a new route

      //router.push(`/app/redirects`);
      // Alternatively, if you need to redirect to an external site:
      //window.location.href = 'https://www.google.com';
      linkRef.current.click()
    }
  }, [redirecting]);

  const handleShortenURL = async () => {

    if (!inputValidate(originalURL)) {
      setErrorMessage('Wrong format given');
      return;
    }

    setErrorMessage('');

    let response;

    try {

      const urlData = {
        original: originalURL,
        description: description
      };

      setLoading(true);
      response = await axios.post(URL_SHORTENED_ENDPOINT, urlData); //Axios dont have a data cache like fetch()

      const { data, status_code } = response.data
      //console.log("Status :->"+status_code);
      if (status_code === 401) {
        setErrorMessage(data);
      } else {
        requestSavedItems();
      }
    } catch (err) {
      console.error('Error Saving New URL:', err);
      setErrorMessage('Error Saving New URL: ' + originalURL);
    } finally {
      setLoading(false);
    }

    if (linkRef.current !== null && linkRef.current !== undefined) {
      linkRef.current.click();
    }
  };

  const requestSavedItems = async () => {
    try {
      const response = await axios.get(URL_SHORTENED_ENDPOINT);
      setShortenedURL(response.data.data);
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
    try {
      const response = await axios.get(URL_REDIRECT_ENDPOINT, {
        params: {
          shorturl: url
        }
      });
      const { data, status_code } = response.data
      if (status_code === 401) {
        setErrorMessage(data);
      } else {
        setRedirecting(true);
        //NavigateToPage(data.toString().trim());
      }
    } catch (err) {
      setErrorMessage('Error on Redirection');
    } finally {
      setShortURL('');
    }
  }

  const deleteSavedEntryPage = async (url: String) => {
    if (url === '') {
      return
    }
    try {
      const response = await axios.delete(URL_SHORTENED_ENDPOINT, {
        params: {
          shorturl: url
        }
      });
      const { data, status_code } = response.data
      if (status_code === 401) {
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

      <Link href="/redirects" legacyBehavior>
        <a ref={linkRef} style={{ display: 'none' }}></a>
      </Link>

    </div>
  );
}





