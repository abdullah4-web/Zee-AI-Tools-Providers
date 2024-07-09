import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { AuthContext } from './AuthContext';

function Paragraph() {
  const { state } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setParagraph('');
      setLoading(true);

      const response = await fetch('/api/v1/ai/paragraph', {
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
        <Card className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '20px', marginBottom: '20px' }}>
          <h3 className="text-center mb-4">Generate Paragraph By AI</h3>
          <Form.Group controlId="paragraphInput">
            <Form.Label>Enter Text for Paragraph:</Form.Label>
            <Form.Control as="textarea" rows={6} value={inputText} onChange={handleInputChange} />
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>

          <Button variant="primary" className="w-20 mt-3" onClick={handleSubmit} disabled={loading}>
           Generate Paragraph
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
            <Card className="mt-3">
              <Card.Body>
                <h5>Generated Paragraph By AI</h5>
                <p>{paragraph}</p>
              </Card.Body>
            </Card>
          )}
        </Card>
      </Container>
    </>
  );
}

export default Paragraph;
