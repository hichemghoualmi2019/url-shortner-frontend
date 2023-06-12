import React, { useState, ChangeEvent, useEffect } from 'react';
import './MultipleURLShortener.css';

interface ShortenedUrlData {
  shortUrl: string;
}

const MultipleURLShortener: React.FC = () => {
  const [inputUrls, setInputUrls] = useState<string[]>([]);
  const [shortenedUrls, setShortenedUrls] = useState<string[]>([]);
  
  const handleUrlChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputUrls(event.target.value.split('\n'));
  };

  const handleShortenUrls = async () => {
    try {
      const response = await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: inputUrls }),
      });
  
      const data = await response.json();
      const shortenedUrls = data.shortenedUrls;
  
      setShortenedUrls(shortenedUrls);
    } catch (error) {
      console.error('Error occurred while shortening URLs:', error);
    }
  };

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/shorten/data');
        const data = await response.json();
        setShortenedUrls(Object.values(data));
      } catch (error) {
        console.error('Error occurred while fetching URLs:', error);
      }
    };

    fetchData();
  }, [shortenedUrls.length]); */
  

  return (
    <div className="container">
      <h1>List URLs Shortener (1 REQUEST)</h1>  
      <textarea className="input-area" value={inputUrls.join('\n')} onChange={handleUrlChange}></textarea>
      <button className="button" onClick={handleShortenUrls}>Shorten URLs</button>
      {shortenedUrls.length > 0 && (
        <div className="result">
          <p className="result-heading">Shortened URLs:</p>
          <ul className="result-list">
            {shortenedUrls.map((url, index) => (
              <li className="result-item" key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultipleURLShortener;