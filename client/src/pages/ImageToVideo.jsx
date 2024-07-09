import React, { useState, useRef, useEffect } from 'react';
import { Spinner, Form, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';

const ImageToVideo = () => {
  const [image, setImage] = useState(null);
  const [condAug, setCondAug] = useState('0.02');
  const [decodingT, setDecodingT] = useState('7');
  const [videoLength, setVideoLength] = useState('14_frames_with_svd');
  const [sizingStrategy, setSizingStrategy] = useState('maintain_aspect_ratio');
  const [motionBucketId, setMotionBucketId] = useState('127');
  const [framesPerSecond, setFramesPerSecond] = useState('6');
  const [output, setOutput] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imageInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    handleImageChange(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        console.error('Image not available.');
        return;
      }

      // Validate frames_per_second and motion_bucket_id
      const parsedFramesPerSecond = parseInt(framesPerSecond, 10);
      const parsedMotionBucketId = parseInt(motionBucketId, 10);

      if (isNaN(parsedFramesPerSecond) || parsedFramesPerSecond < 5 || parsedFramesPerSecond > 30) {
        console.error('Invalid frames_per_second. It should be between 5 and 30.');
        return;
      }

      if (isNaN(parsedMotionBucketId) || parsedMotionBucketId < 1 || parsedMotionBucketId > 255) {
        console.error('Invalid motion_bucket_id. It should be between 1 and 255.');
        return;
      }

      const requestData = {
        cond_aug: parseFloat(condAug),
        decoding_t: parseInt(decodingT, 10),
        input_image: image,
        video_length: videoLength,
        sizing_strategy: sizingStrategy,
        motion_bucket_id: parsedMotionBucketId,
        frames_per_second: parsedFramesPerSecond,
      };

      const response = await fetch('/api/rep/image-to-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      setOutput(data.output);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-4" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '15px' }}>
      <div className="image-capture-container">
        <h1 className='mb-2'>Image To Video With AI</h1>

        <div {...getRootProps()} className={`drag-drop-container ${isDragActive ? 'drag-active' : ''}`}>
          {uploading ? (
            <Spinner animation="border" size="sm" className="mr-2" />
          ) : (
            <>
              {image ? (
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
              ) : (
                <>
                  {!isDragActive && (
                    <label htmlFor="upload-input" className="upload-label">
                      Drag and drop your image here
                    </label>
                  )}
                  <input
                    {...getInputProps()}
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    style={{ display: 'none' }}
                    id="upload-input"
                  />
                </>
              )}
            </>
          )}
        </div>

        <Form onSubmit={handleSubmit}>
          {/* ... (remaining form components) */}
        </Form>

        {output && (
          <div className="response-container mt-4">
            <h2>Video Generation</h2>
            {uploading ? (
              <Spinner animation="border" size="sm" className="mr-2" />
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToVideo;
