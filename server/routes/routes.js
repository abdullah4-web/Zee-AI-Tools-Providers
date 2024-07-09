import express from 'express';
import axios from 'axios';
import { RAPID_API_KEY } from '../config/config.js';
import { HfInference } from '@huggingface/inference';

const router = express.Router();

// Initialize Hugging Face Inference with your access token
const hf = new HfInference('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');

router.get('/search',   async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://real-time-product-search.p.rapidapi.com/search',
      params: req.query,
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
});

router.get('/jobsearch', async (req, res) => {
  try {
    const jobSearchOptions = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: req.query,
      headers: {
        'X-RapidAPI-Key': '06f817bbebmsh77e493b9f14214ep158067jsn8e298a63183f',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
       
      },
    };

    const response = await axios.request(jobSearchOptions);
    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
});

// New route for text-to-speech
router.post('/text-to-speech', async (req, res) => {
  try {
    const { model, inputs } = req.body;

    // Validate model and inputs

    const textToSpeechOptions = {
      model,
      inputs,
    };

    const textToSpeechResponse = await hf.textToSpeech(textToSpeechOptions);

    // Set appropriate headers for audio response
   // Instead of sending the Blob directly, convert it to a buffer
const audioBuffer = await textToSpeechResponse.arrayBuffer();
res.send(Buffer.from(audioBuffer));

    console.log(textToSpeechResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
});


router.post('/text-to-image', async (req, res) => {
  try {
    const { inputs, model } = req.body;

    if (!inputs || !model) {
      return res.status(400).json({ error: 'Missing inputs or model in the request body' });
    }

    const resultBlob = await hf.textToImage({
      inputs,
      model,
      parameters: {
        negative_prompt: 'blurry',
      }
    });

    const imageBuffer = Buffer.from(await resultBlob.arrayBuffer());
    const base64Image = imageBuffer.toString('base64');

    if (base64Image) {
      // Send the base64-encoded image directly in the response
      res.status(200).json({ image: base64Image });
    } else {
      res.status(500).json({ error: 'Image data not found in the response' });
    }
  } catch (error) {
    console.error('Error processing text to image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
