import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LantanaVideo = () => {
  const [prompt, setPrompt] = useState('');
  const [fps, setFps] = useState(4);
  const [model_name, setModelName] = useState("dreamlike-art/dreamlike-photoreal-2.0");
  const [timestep_t0, setTimestepT0] = useState(44);
  const [timestep_t1, setTimestepT1] = useState(47);
  const [video_length, setVideoLength] = useState(8);
  const [negative_prompt, setNegativePrompt] = useState('');
  const [motion_field_strength_x, setMotionFieldStrengthX] = useState(12);
  const [motion_field_strength_y, setMotionFieldStrengthY] = useState(12);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/rep/lantana-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          fps: parseInt(fps) || 4,
          model_name: model_name || "dreamlike-art/dreamlike-photoreal-2.0",
          timestep_t0: parseInt(timestep_t0) || 44,
          timestep_t1: parseInt(timestep_t1) || 47,
          video_length: parseInt(video_length) || 8,
          negative_prompt: negative_prompt || "",
          motion_field_strength_x: parseInt(motion_field_strength_x) || 12,
          motion_field_strength_y: parseInt(motion_field_strength_y) || 12,
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

  return (
    <Container className="d-flex align-items-center justify-content-center mb-5">
      <div style={{ maxWidth: '800px', width: '100%', marginTop: '10px',padding: '20px', border: '2px dashed #3498db' }}>
        <h2 className="text-center mb-4">Lantana Video Generation</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="promptInput" className='mt-2'>
            <Form.Label>Prompt</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
          <Form.Group controlId="modelNameInput" className='mt-2'>
            <Form.Label>Model Name</Form.Label>
            <Form.Control
              type="text"
              value={model_name}
              onChange={(e) => setModelName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="timestepT0Input" className='mt-2'>
            <Form.Label>Timestep T0</Form.Label>
            <Form.Control
              type="number"
              value={timestep_t0}
              onChange={(e) => setTimestepT0(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="timestepT1Input" className='mt-2'>
            <Form.Label>Timestep T1</Form.Label>
            <Form.Control
              type="number"
              value={timestep_t1}
              onChange={(e) => setTimestepT1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="videoLengthInput" className='mt-2'>
            <Form.Label>Video Length</Form.Label>
            <Form.Control
              type="number"
              value={video_length}
              onChange={(e) => setVideoLength(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="negativePromptInput" className='mt-2'>
            <Form.Label>Negative Prompt</Form.Label>
            <Form.Control
              type="text"
              value={negative_prompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="motionFieldStrengthXInput" className='mt-2'>
            <Form.Label>Motion Field Strength X</Form.Label>
            <Form.Control
              type="number"
              value={motion_field_strength_x}
              onChange={(e) => setMotionFieldStrengthX(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="motionFieldStrengthYInput" className='mt-2'>
            <Form.Label>Motion Field Strength Y</Form.Label>
            <Form.Control
              type="number"
              value={motion_field_strength_y}
              onChange={(e) => setMotionFieldStrengthY(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-20 mt-3" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : 'Generate Video'}
          </Button>
        </Form>

        {output && (
          <div className="text-center mt-4">
            <h2>Generated Video</h2>
            <ReactPlayer url={output} controls width="800px" height="450px" />
          </div>
        )}
        <ToastContainer />
      </div>
    </Container>
  );
};

export default LantanaVideo;
