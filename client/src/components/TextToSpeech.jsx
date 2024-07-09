import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import toWav from 'audiobuffer-to-wav';

const TextToSpeech = () => {
  const [model, setModel] = useState('espnet/kan-bayashi_ljspeech_vits');
  const [inputText, setInputText] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cleanup the URL when the component unmounts
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleTextToSpeech = async () => {
    try {
      setError(null);
      setLoading(true);

      // Validate inputText and model if needed

      const response = await axios.post(
        '/api/text-to-speech',
        { model, inputs: inputText },
        { responseType: 'arraybuffer' }
      );

      // Set the audioBlob to the response data
      setAudioBlob(response.data);

      // Convert FLAC to WAV
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Additional check and log for AudioContext state
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const audioBuffer = await audioContext.decodeAudioData(response.data);
      const wavBuffer = toWav(audioBuffer);
      const wavBlob = new Blob([new DataView(wavBuffer)], { type: 'audio/wav' });

      // Create URL for the converted audio file
      const url = URL.createObjectURL(wavBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to generate audio');
    } finally {
      setLoading(false);
    }
  };

  // Function to play the generated audio
  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  // Function to download the audio file
  const downloadAudio = () => {
    if (audioBlob) {
      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;
      downloadLink.download = 'generated_audio.wav';
      downloadLink.click();
    }
  };

  return (
    <Container className="mt-3">
      <Card className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '20px', marginBottom: '20px' }}>
        <h3 className="text-center mb-4">Text to Speech With AI</h3>
        <Form.Group controlId="modelSelect">
          <Form.Label>Select Model:</Form.Label>
          <Form.Control as="select" value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="julien-c/ljspeech_tts_train_tacotron2_raw_phn_tacotron_g2p_en_no_space_train">Female train</option>
            <option value="espnet/kan-bayashi_ljspeech_transformer">Female Transform</option>
            <option value="espnet/kan-bayashi_ljspeech_fastspeech2">Female Fast Speech</option>
            <option value="espnet/kan-bayashi_ljspeech_tts_finetune_joint_conformer_fastspeech2_hifigan_-truncated-737899">Female Truncated</option>
            <option value="facebook/fastspeech2-en-200_speaker-cv4">Female Speaker</option>
            <option value="Voicemod/fastspeech2-en-200_speaker-cv4">Female Speaker 2</option>
            <option value="Voicemod/fastspeech2-en-ljspeech">Female Voicemid</option>
            <option value="espnet/kan-bayashi_ljspeech_vits">Female</option>
            <option value="espnet/english_male_ryanspeech_fastspeech">Male Tacotron</option>
            <option value="espnet/english_male_ryanspeech_tacotron">Male Fast </option>
            <option value="espnet/english_male_ryanspeech_fastspeech2">Male Fast 2 </option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="textInput">
          <Form.Label>Enter Text:</Form.Label>
          <Form.Control as="textarea" rows={6} value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter text here..." />
        </Form.Group>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
        <Button variant="primary" className="w-20 mt-3" onClick={handleTextToSpeech} disabled={loading}>
          Generate Audio
        </Button>
        </div>
        {error && <Alert variant="danger" className="mt-3">Error: {error}</Alert>}
        {loading && (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status" size="lg">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {audioBlob && (
          <div className="mt-3">
            <Button variant="secondary" onClick={playAudio} block>
              Play Audio
            </Button>
            <Button variant="success" onClick={downloadAudio} block>
              Download Audio
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default TextToSpeech;
