import React, { useState, ChangeEvent } from 'react';
import './MultipleURLShortener.css';

interface ShortenedUrlData {
  shortUrl: string;
}

const URLShortener: React.FC = () => {
  const [inputUrls, setInputUrls] = useState<string[]>([]);
  const [shortenedUrls, setShortenedUrls] = useState<string[]>([]);

  const handleUrlChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputUrls(event.target.value.split('\n'));
  };

  
  const handleShortenUrls = async () => {
    try {
      const promises = inputUrls.map(url => {
        return fetch('http://localhost:3000/shorten/one', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: url }),
        }).then(response => response.json() as Promise<ShortenedUrlData>);
      });

      const results = await Promise.all(promises);
      const shortenedUrls = results.map(data => data.shortUrl);

      setShortenedUrls(shortenedUrls);
    } catch (error) {
      console.error('Error occurred while shortening URLs:', error);
    }
  };

  return (
    <div className="container">
      <h1>List URLs Shortener (multiple REQUEST)</h1>  
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

export default URLShortener;
