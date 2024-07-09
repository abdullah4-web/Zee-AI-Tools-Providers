import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import PromptSection from '../components/PromptSection';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function ImageGenerator() {
  const { state } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const [imageType, setImageType] = useState('3D Model'); // Added state for image type

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const showToast = (message, type = 'error') => {
    toast[type](message, { autoClose: 5000 });
  };

  const generatePrompt = () => {
    return `Generate a ${imageType} with ${inputText}`;
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setImageUrl('');
      setLoading(true);
      setShowCopyButton(false);
      setShowCopyAlert(false);

      const response = await fetch('/api/v1/ai/imagegenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ text: generatePrompt() }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.imageUrl);
        setBase64Image(data.base64Image);
        setDownloadReady(true);
        setShowCopyButton(true);
      } else {
        setError('Error generating the image. Please try again.');
        showToast('Error generating the image. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      showToast('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = b64toBlob(base64Image);
    saveAs(blob, 'generated_image.png');
  };

  const b64toBlob = (b64Data) => {
    const contentType = 'image/png';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl).then(
      function () {
        console.log('Image URL copied to clipboard');
        setShowCopyAlert(true);
        setTimeout(() => {
          setShowCopyAlert(false);
        }, 5000);
      },
      function (err) {
        console.error('Error copying image URL to clipboard:', err);
      }
    );
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center mt-5">
        <div style={{ maxWidth: '800px', width: '100%', padding: '20px', border: '2px dashed #3498db' }}>
          <h2 className="text-center mb-4">Generate Your Image With AI</h2>

          {/* Dropdown to select image type */}
          <Form.Group controlId="imageTypeSelect">
            <Form.Label>Select Image Type:</Form.Label>
            <Form.Select
              className='mb-3'
              as="select"
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
            >
              <option value="Create a realistic 3D model featuring">3D Model</option>
              <option value="Generate a cinematic image featuring">Cenematic </option>
              <option value="Design a comic book-style illustration with">Comic Book</option>
              <option value="Generate a unique and imaginative digital art composition with">Digital Art</option>
              <option value="Create a fantasy-inspired illustration featuring">fantasy</option>
              <option value="Generate an isometric view of a scene featuring">isometric</option>
              <option value="Create a detailed and expressive line art image featuring">Line Art</option>
              <option value="Generate a unique and stylish title texture featuring">Title Texture</option>

            </Form.Select>
          </Form.Group>

          <Form.Group controlId="imageGeneratorInput">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Text..."
              value={inputText}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
              className="w-20 mt-3"
            >
              Generate Image
            </Button>
          </div>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {loading && (
            <div className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
              <div className="text-center">
                <Spinner animation="border" role="status" size="lg" >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            </div>
          )}
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="Generated Sci-Fi Image"
                style={{
                  maxWidth: '100%',
                  height: '400px',
                  border: '2px solid #3498db',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  margin: '20px 0',
                }}
              />
              {showCopyButton && (
                <Button
                  variant="success"
                  onClick={handleCopyUrl}
                  className="w-100 mt-3"
                >
                  Copy Image URL
                </Button>
              )}
              {imageUrl && downloadReady && (
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  className="w-100 mt-3"
                >
                  Download Image
                </Button>
              )}
              {showCopyAlert && (
                <Alert variant="success" className="mt-3">
                  Image URL copied to clipboard!
                </Alert>
              )}
            </div>
          )}
        </div>
      </Container>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '30vh' }}>
        <Link
          variant="primary"
          to='/proimagegenerator'
          className="btn mt-1"
          style={{ backgroundColor: '#7b57b2', borderColor: '#7b57b2' }}
        >
          Try Pro Image Generator Tool
        </Link>
      </div>
     
      <ToastContainer />
      <PromptSection />
    </>
  );
}

export default ImageGenerator;
