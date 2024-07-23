
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { generateUUID, inputValidate } from './utils/stringutils';

const BASE_URL = "sho.rt";
const URL_SHORTENED_ENDPOINT ="api/url/shorten";
const URL_REDIRECT_ENDPOINT ="api/url/redirect";

export default function Home() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [shortenedURLs, setShortenedURL] = useState<UrlShorter[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

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
    const fullUrl = BASE_URL + '/' + generateUUID();
    console.log(fullUrl)
    let response;

    try {
      
      const urlData = {
        original: originalURL,
        shortened: fullUrl,
        description: description
      };

      setLoading(true);
      response = await axios.post(URL_SHORTENED_ENDPOINT, urlData); //Axios dont have a data cache like fetch()

      const { data,  status_code } = response.data
      //console.log("Status :->"+status_code);
      if(status_code === 401) {
        setErrorMessage(data);
      } else {
        requestSavedItems();
      }
    } catch (err) {
      console.error('Error Saving New URL:', err);
      setErrorMessage('Error Saving New URL: '+originalURL);
    } finally {
      setLoading(false);
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

  function navigateToPage(url: String) {
    window.open(url.toString().trim(), '_blank')
  }

  const redirectToPage = async (url: String) => {
    if(url === '') {
        return
    }
    try {
      const urlData = {
        shortened: url,
      };
      const response = await axios.post(URL_REDIRECT_ENDPOINT, urlData);
      const { data,  status_code } = response.data
      console.log("Data :->"+data);
      console.log("Status :->"+status_code)
      if(status_code === 401) {
        setErrorMessage(data);
      } else {
           window.open(data.toString().trim(), '_blank')
      }
    } catch (err) {
      setErrorMessage('Error on Redirection');
    } finally {
      setShortURL('');
    }
  }

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <input
        type="text"
        className="url-input"
        placeholder="Enter your URL"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
        onSubmit={handleShortenURL}
      />

      <input
        type="text"
        className="url-input"
        placeholder="Enter Description(optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
     
      <p className="error">{errorMessage}</p>
      <button className="shorten-button" onClick={handleShortenURL} disabled={loading}>
        {loading ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>
            Shorten Url
          </>
        )}
      </button>

      <br></br>
      <br></br>
      <h2 className="w-full text-l text-red-800 text-xl">Search By Short Url</h2>
      <input
        type="text"
        className="url-input"
        placeholder="Enter Short Url"
        value={shortURL}
        onChange={(e) => setShortURL(e.target.value)}
      />
      <button className="shorten-button" onClick={() => redirectToPage(shortURL) } disabled={loading}>
        {loading ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>
            Search & Navigate
          </>
        )}
      </button>

      <br></br>
      <br></br>
      <h2 className="w-full text-l text-red-800 text-xl">Stored Items</h2>
      <ul className="shortened-list">
        {shortenedURLs.map((shortenedData) => (
          <li key={shortenedData.id} onClick={()=> navigateToPage(shortenedData.original)}>
            <p className=' text-blue-600'>{shortenedData.shortened}</p>
            <p className='text-sm'>{shortenedData.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}





