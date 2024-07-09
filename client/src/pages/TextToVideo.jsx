import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextToVideo = () => {
  const [prompt, setPrompt] = useState('');
  const [fps, setFps] = useState(8);
  const [numFrames, setNumFrames] = useState(50);
  const [numInferenceSteps, setNumInferenceSteps] = useState(50);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation for numInferenceSteps
    if (numInferenceSteps < 1 || numInferenceSteps > 500) {
      toast.error("Number of denoising steps must be between 1 and 500.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/rep/text-to-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          fps: parseInt(fps),
          num_frames: parseInt(numFrames),
          num_inference_steps: parseInt(numInferenceSteps),
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
    link.href = output;
    link.download = 'generated_video.mp4';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mb-3">
      <div style={{ maxWidth: '800px', width: '100%',  marginTop: '10px',padding: '20px', border: '2px dashed #3498db' }}>
        <h2 className="text-center mb-4">Text to Video with AI</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="promptInput" className='mt-2'>
            <Form.Label>Text / Prompt / Idea</Form.Label>
            <Form.Control
              type="text"
              placeholder="Express your idea in words...."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Form.Group>
        
          <Form.Group controlId="numFramesInput" className='mt-2'>
            <Form.Label>Number of frames for the output video </Form.Label>
            <Form.Control
              type="number"
              value={numFrames}
              onChange={(e) => setNumFrames(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fpsInput" className='mt-2'>
            <Form.Label>Frame per second for the output video</Form.Label>
            <Form.Control
              type="number"
              value={fps}
              onChange={(e) => setFps(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="numInferenceStepsInput" className='mt-2'>
            <Form.Label>Number of denoising steps (minimum: 1, maximum: 500)</Form.Label>
            <Form.Control
              type="number"
              value={numInferenceSteps}
              onChange={(e) => setNumInferenceSteps(e.target.value)}
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
            <ReactPlayer url={output} controls width="800px" height="450px" />
            <Button variant="success" onClick={handleDownload} className="w-20 mt-2">
              Download Video
            </Button>
          </div>
        )}
         <ToastContainer />
      </div>
    </Container>
  );
};

export default TextToVideo;
