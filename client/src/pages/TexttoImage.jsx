import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputToImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('stabilityai/stable-diffusion-2');
  const [input, setInput] = useState('Tiger Head, smoke, dark background');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: input,
          model: model,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const responseData = await response.json();

      if (responseData.image) {
        const dataUrl = `data:image/jpeg;base64,${responseData.image}`;
        setImageUrl(dataUrl);
      } else {
        console.error('Empty or undefined image data in the response');
        setError('Empty or undefined image data in the response');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setError('Error fetching image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated_image.jpg';
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link element
    document.body.removeChild(link);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-2">
      <div style={{ maxWidth: '800px', width: '100%', padding: '20px',margin: '10px', border: '2px dashed #3498db' }}>
        <h2 className="text-center mb-4">Generate Image with Text</h2>
        <Form.Group controlId="modelSelect">
          <Form.Label>Choose Model:</Form.Label>
          <Form.Control as="select" value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="stabilityai/stable-diffusion-2">Model 1</option>
          <option value="dataautogpt3/OpenDalle">Model 2</option>
          <option value="CompVis/stable-diffusion-v1-4">Model 3</option>
          <option value="runwayml/stable-diffusion-v1-5">Model 4</option>
          <option value="playgroundai/playground-v2-1024px-aesthetic">Model 5</option>
          <option value="thibaud/sdxl_dpo_turbo">Model 6</option>

          
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="imageGeneratorInput" className='mt-2'>
          <Form.Control 
            as="textarea"
            rows={4}
            placeholder="Enter Text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
        <Button variant="primary" onClick={fetchData} disabled={loading} className="w-20 mt-2">
          Generate Image
        </Button>
        </div>
        {loading && (
          <div className="mx-auto" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {imageUrl && (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="Generated Image"
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '2px solid #3498db',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                margin: '20px 0',
              }}
            />
            <Button variant="success" onClick={handleDownload} className="w-20 mt-2">
              Download Image
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default InputToImage;
