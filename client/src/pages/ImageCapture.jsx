import React, { useState, useRef, useEffect, useContext } from 'react';
import './ImageCapture.css';
import { Spinner } from 'react-bootstrap';  
import { AuthContext } from './AuthContext';

const ImageCapture = () => {
  const  { state } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [userText, setUserText] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 

  const handleImageUpload = (file) => {
    if (!image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSendImage = async () => {
    try {
      if (!image) {
        console.error('Image not available.');
        return;
      }

      setLoading(true);
 
      const response = await fetch('/api/v1/ai/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({
          image: image.split(',')[1],
          text: userText,
        }),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error sending image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  };

  return (
    <>
 
    <div className="mx-auto" style={{ maxWidth: '800px', marginTop : '10px' , border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
    <div className="image-capture-container">
      <h1>Image Analysis</h1>
      <div
        className="drag-drop-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {loading ? (
          <Spinner color="#333" loading={loading} size={100} />
        ) : (
          <>
            {image ? (
              <img src={image} alt="Uploaded" className="uploaded-image" />
            ) : (
              <>
                <label htmlFor="upload-input" className="upload-label">
                  Drag and drop your image here
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                  id="upload-input"
                />
              </>
            )}
          </>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Describe , Explain diagram ... "
        />
      </div>

      <div className="button-container">
        <button onClick={handleSendImage} disabled={!image || loading}>
          Analyze Image
        </button>
      </div>

      {response && (
        <div className="response-container">
          <h2>Image Analysis</h2>
          {response.choices && response.choices.length > 0 && (
             <div className="justified-text" dangerouslySetInnerHTML={{ __html: response.choices[0].message.content }} />
          )}
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default ImageCapture;
