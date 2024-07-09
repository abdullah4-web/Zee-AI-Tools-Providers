import React, { useState } from 'react';
import { Spinner, Form, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';

const ColourYourVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [renderFactor, setRenderFactor] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (acceptedFiles) => {
    setVideoFile(acceptedFiles[0]);
  };

  const handleRenderFactorChange = (e) => {
    setRenderFactor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('videoFile', videoFile);
      formData.append('render_factor', renderFactor);

      const response = await fetch('/api/rep/colour-your-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data.output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Dropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleFileChange,
      accept: 'video/*',
    });

    return (
      <div {...getRootProps()} className={`drag-drop-container ${isDragActive ? 'drag-active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the video file here...</p> : <p>Drag 'n' drop a video file here, or click to select one</p>}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="border p-4">
            <h2 className="text-center mb-4">Colourize Your Video</h2>
            <form onSubmit={handleSubmit}>
              <Dropzone />

              <Form.Group controlId="renderFactor" className="mt-3">
                <Form.Label> Resolution of the image is rendered</Form.Label>
                <Form.Control
                  type="number"
                  value={renderFactor}
                  onChange={handleRenderFactorChange}
                />
              </Form.Group>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>

              <Button type="submit" disabled={loading} className="mt-3" block>
                {loading ? 'Uploading...' : 'Submit'}
              </Button>
              </div>
            </form>

            {result && (
              <div className="response-container mt-1">
                <ReactPlayer url={result} controls width="100%" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColourYourVideo;
