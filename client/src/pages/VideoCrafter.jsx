import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';

const defaultValues = {
  fps: 15,
  seed: 64045,
  steps: 40,
  width: 1024,
  height: 576,
  prompt: 'modern disco club night view',
};

const VideoCrafter = () => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(defaultValues.prompt);
  const [fps, setFps] = useState(defaultValues.fps.toString());
  const [seed, setSeed] = useState(defaultValues.seed.toString());
  const [steps, setSteps] = useState(defaultValues.steps.toString());
  const [width, setWidth] = useState(defaultValues.width.toString());
  const [height, setHeight] = useState(defaultValues.height.toString());
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/video-crafter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          fps,
          seed,
          steps,
          width,
          height,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video');
      }

      const responseData = await response.json();

      if (responseData.output) {
        setOutput(responseData.output);
      } else {
        console.error('Empty or undefined output data in the response');
        toast.error('Empty or undefined output data in the response');
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      toast.error('Error fetching video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mb-5">
      <div style={{ maxWidth: '800px', width: '100%', padding: '20px', marginTop: '10px',border: '2px dashed #3498db' }}>
        <h2 className="text-center mb-4">One Shot Video Generator</h2>
        <Form.Group controlId="promptInput" className="mt-2">
          <Form.Label>Prompt:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="fpsInput" className="mt-2">
          <Form.Label>FPS:</Form.Label>
          <Form.Control
            type="number"
            placeholder="FPS"
            value={fps}
            onChange={(e) => setFps(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="seedInput" className="mt-2">
          <Form.Label>Seed:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="stepsInput" className="mt-2">
          <Form.Label>Steps:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="widthInput" className="mt-2">
          <Form.Label>Width:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="heightInput" className="mt-2">
          <Form.Label>Height:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="primary" onClick={fetchData} disabled={loading} className="w-20 mt-2">
            Generate Video
          </Button>
        </div>
        {loading && (
          <div className="mx-auto" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {output && (
          <div className="text-center">
            <ReactPlayer url={output} controls width="100%" height="auto" />
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
    </Container>
  );
};

export default VideoCrafter;
