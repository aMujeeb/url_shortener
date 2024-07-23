
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import inputValidate from './utils/stringutils';

const BASE_URL = "sho.rt";
const URL_ENDPOINT ="api/url/shorten";
const {
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

export default function Home() {
  const [originalURL, setOriginalURL] = useState('');
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
    const fullUrl = BASE_URL + '/' + uuidv4();
    console.log(fullUrl)
    let response;

    try {
      
      const urlData = {
        original: originalURL,
        shortened: fullUrl,
      };

      setLoading(true);
      response = await axios.post(URL_ENDPOINT, urlData); //Axios dont have a data cache like fetch()

      const { data,  status_code } = response.data
      //console.log("Status :->"+status_code);
      if(status_code === 401) {
        setErrorMessage(data);
      } else {
        //setShortenedURL([response.data.data])
        //response = await axios.get(URL_ENDPOINT);
        //setShortenedURL(response.data.data);
        //console.log(response.data.data);
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
      const response = await axios.get(URL_ENDPOINT);
      setShortenedURL(response.data.data);
    } catch (err) {
      setErrorMessage('Error fetching products:');
    }
  };

  function navigateToPage(original: String) {
    window.open(original.toString().trim(), '_blank')
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
      <h3 className="w-full text-center text-neutral-600">Stored Items</h3>
      <ul className="shortened-list">
        {shortenedURLs.map((shortened) => (
          <li key={shortened.id} onClick={()=> navigateToPage(shortened.shortened)}>{shortened.shortened}</li>
        ))}
      </ul>
    </div>
  );
}





