import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from './AuthContext';

function JSConverter() {
  const { state } = useContext(AuthContext);
  const [inputText, setInputText] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    setConvertedCode('');
    setLoading(true);

    try {
      const response = await fetch('/api/v1/ai/js-converter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        setError('Error converting the code. Please try again.');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setConvertedCode(data.answer);
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
   
      <Container className="mt-2">
        <Card className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
          <h3 className="text-center mb-4">Convert HTML Code to JSX Code</h3>
          <Form.Group controlId="jsConverterInput">
           
            <Form.Control as="textarea" rows={6} value={inputText} onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" className="w-100 mb-3" onClick={handleSubmit} disabled={loading}>
           Convert to JSX
          </Button>
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
          {convertedCode && (
            <Card className="mt-3">
              <Card.Body>
               
                <Form.Group controlId="convertedCodeTextarea">
                  <Form.Control as="textarea" rows={10} placeholder='Enter HTML Code To Convert JSX' readOnly value={convertedCode} />
                </Form.Group>
              </Card.Body>
            </Card>
          )}
        </Card>
      </Container>
    </>
  );
}

export default JSConverter;
