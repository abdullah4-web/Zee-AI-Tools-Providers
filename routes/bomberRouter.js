import express from 'express';
import fetch from 'node-fetch';
import { parseString } from 'xml2js';

const bombrouter = express();


bombrouter.get('/search', async (req, res) => {
    try {
      const { country, query } = req.body;
  
      if (!country || !query) {
        return res.status(400).json({ error: 'Country and query parameters are required.' });
      }
  
      const apiUrl = `http://google.com/complete/search?output=toolbar&gl=${country}&q=${query}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const xmlData = await response.text();
  
      parseString(xmlData, { explicitArray: false }, (err, result) => {
        if (err) {
          throw new Error(`Error parsing XML: ${err.message}`);
        }
  
        res.json(result);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  export default bombrouter;  