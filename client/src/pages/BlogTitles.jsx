import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from './AuthContext';

function BlogTitles() {
  const  { state } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const copyToClipboard = (line) => {
    navigator.clipboard.writeText(line)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
      });
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setParagraph('');
      setLoading(true);

      const response = await fetch('/api/v1/ai/youtubetitles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (response.ok) {
        setParagraph(data.answer);
      } else {
        setError('Error generating the paragraph. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
  
      <Container className="mt-3">
        <div className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
          <h3 className="text-center mb-4">Generate Blog Titles With AI</h3>
          <Form.Group controlId="textInput">
            <Form.Control
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter keywords"
            />
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>

          <Button
            variant="primary"
            className="w-20 mt-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            Generate Bloge Titles
          </Button>
          </div>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {loading && (
             <div className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
            <div className="text-center">
              <Spinner animation="border" role="status"size="lg" >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
            </div>
          )}
          {paragraph && (
            <div className="mt-3">
              <h5 className="text-center">Generated Blog Titles By AI</h5>
              <ul className="list-unstyled text-left mt-2">
                {paragraph.split('\n').map((line, index) => (
                  line.trim() !== '' && (
                    <div key={index} className="d-flex align-items-center justify-content-between border-bottom py-2">
                      <div className="d-flex align-items-center">
                        <div className="line-number "></div>
                        <h6>{line}</h6>
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => copyToClipboard(line)}>
                        Copy
                      </Button>
                    </div>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default BlogTitles;
