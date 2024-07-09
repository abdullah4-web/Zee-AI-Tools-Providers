import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeBackgroundForm = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [outputType, setOutputType] = useState('green-screen');
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

    const handleOutputTypeChange = (e) => {
        setOutputType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!videoFile || !outputType) {
            toast.error('Video file and output type are required.');
            return;
        }

        const formData = new FormData();
        formData.append('input_video', videoFile);
        formData.append('output_type', outputType);

        try {
            setUploading(true);
            const response = await axios.post('/api/rep/changingbg', formData);
            setOutput(response.data.output);
            setError(null);
        } catch (error) {
            toast.error('An error occurred during the background change process.');
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
                    <div className="video-container " style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <ReactPlayer
                        url={URL.createObjectURL(videoFile)}
                        controls
                        width="300px"
                        height="400px"
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                    />
                 </div>
                
                ) : (
                    isDragActive ? <p>Drop the video file here...</p> : <p>Drag 'n' drop a video file here, or click to select one</p>
                )}
            </div>
        );
    };

    return (
        <div className="mx-auto m-4 p-3" style={{ maxWidth: '800px', border: '2px dashed #3498db', borderRadius: '10px' }}>
            <div className="image-capture-container">
                <h2 className="mb-2">Change Background of video With AI</h2>

                <form onSubmit={handleSubmit}>
                    <Dropzone />

                    <Form.Group controlId="outputType" className="mt-3">
                        <Form.Label>Output Type:</Form.Label>
                        <Form.Select value={outputType} onChange={handleOutputTypeChange}>
                            <option value="">Select Output Type</option>
                            <option value="green-screen">Green Screen </option>
                            <option value="alpha-mask">Alpha Mask</option>
                            <option value="foreground-mask">Forground Mask</option>
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" className="mt-3" disabled={!videoFile || !outputType || uploading}>
                        Submit
                    </Button>
                </form>
                {uploading && (
                    <div className="mt-5 text-center">
                        <Spinner animation="border" role="status" size="lg" style={{ color: '#3498db' }}>
                            <span className="sr-only">loading....</span>
                        </Spinner>
                    </div>
                )}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {output && (
                    <div className="video-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <ReactPlayer
                            url={output}
                            playing={playing}
                            controls
                            width="300px"
                            height="400px"
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            onEnded={() => setPlaying(false)}
                        />
                    </div>
                )}
                  <ToastContainer />
            </div>
        </div>
    );
};

export default ChangeBackgroundForm;
