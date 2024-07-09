import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player';

const InfiniteZoom = () => {
  const [prompt, setPrompt] = useState('');
  const [inpaintIter, setInpaintIter] = useState(2);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rep/infinite-zoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          inpaint_iter: parseInt(inpaintIter),
          output_format: outputFormat,
        }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error(error);
      toast.error("Check your internet connection and try again");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = output.mp4; // Use the correct property from the API response
    link.download = 'infinite_zoom_video.mp4';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container className="d-flex align-items-center justify-content-center mb-5">
      <div style={{ maxWidth: '800px', width: '100%', marginTop: '10px',padding: '20px', border: '2px dashed #3498db' }}>
        <h2 className="text-center mb-4">Infinite Zoom with AI</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="promptInput" className='mt-2'>
            <Form.Label>Text / Prompt / Idea</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the infinite zoom..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="inpaintIterInput" className='mt-2'>
            <Form.Label>Number of Inpainting Iterations</Form.Label>
            <Form.Control
              type="number"
              value={inpaintIter}
              onChange={(e) => setInpaintIter(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="outputFormatInput" className='mt-2'>
            <Form.Label>Output Video Format</Form.Label>
            <Form.Control
              type="text"
              placeholder="mp4"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            />
          </Form.Group>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <Button type="submit" variant="primary" className="w-20 mt-3" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : 'Generate Video'}
            </Button>
          </div>
        </Form>

        {output && (
          <div className="text-center mt-4">
            <h2>Generated Video</h2>
            <ReactPlayer url={output.mp4} controls width="300px" height="400px" />
           
          </div>
        )}
        <ToastContainer />
      </div>
    </Container>
  );
};

export default InfiniteZoom;
