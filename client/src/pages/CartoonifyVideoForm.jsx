import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';

const CartoonifyVideoForm = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [frameRate, setFrameRate] = useState('');
    const [horizontalResolution, setHorizontalResolution] = useState('');
    const [error, setError] = useState(null);
    const [output, setOutput] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const handleFileChange = (acceptedFiles) => {
        setVideoFile(acceptedFiles[0]);
    };

    const handleFrameRateChange = (e) => {
        setFrameRate(e.target.value);
    };

    const handleHorizontalResolutionChange = (e) => {
        setHorizontalResolution(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!videoFile || !frameRate || !horizontalResolution) {
            setError('All parameters are required.');
            return;
        }

        const formData = new FormData();
        formData.append('videoFile', videoFile);
        formData.append('frame_rate', frameRate);
        formData.append('horizontal_resolution', horizontalResolution);

        try {
            setUploading(true);
            const response = await axios.post('/api/rep/cartoonify-video', formData);
            setOutput(response.data.output);
            setError(null);
        } catch (error) {
            setError('An error occurred during the cartoonification process.');
            setOutput(null);
        } finally {
            setUploading(false);
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
                {videoFile ? (
                    <div>
                        <ReactPlayer
                            url={URL.createObjectURL(videoFile)}
                            controls
                            width="100%"
                            height="100%"
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            onEnded={() => setPlaying(false)}
                        />
                        <p>Drag 'n' drop a different video file here, or click to select one</p>
                    </div>
                ) : (
                    isDragActive ? <p>Drop the video file here...</p> : <p>Drag 'n' drop a video file here, or click to select one</p>
                )}
            </div>
        );
    };

    return (
        <div className="mx-auto mt-4" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '15px' }}>
            <div className="image-capture-container">
                <h1 className="mb-2">Cartoonify Video</h1>

                <form onSubmit={handleSubmit}>
                    <Dropzone />

                    <Form.Group controlId="frameRate" className="mt-3">
                        <Form.Label>Frame Rate:</Form.Label>
                        <Form.Control type="text" value={frameRate} onChange={handleFrameRateChange} />
                    </Form.Group>

                    <Form.Group controlId="horizontalResolution" className="mt-3">
                        <Form.Label>Horizontal Resolution:</Form.Label>
                        <Form.Control type="text" value={horizontalResolution} onChange={handleHorizontalResolutionChange} />
                    </Form.Group>

                    <Button type="submit" className="mt-3" disabled={!videoFile || uploading}>
                        Submit
                    </Button>
                </form>
                {uploading && (
                    <div className="mt-5 text-center">
                        <Spinner animation="border" role="status" size="lg" style={{ color: '#3498db' }}>
                            <span className="sr-only">Uploading....</span>
                        </Spinner>

                    </div>
                )}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {output && (
                    <div className="response-container mt-3">
                        <ReactPlayer
                            url={output}
                            playing={playing}
                            controls
                            width="100%"
                            height="100%"
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            onEnded={() => setPlaying(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartoonifyVideoForm;
