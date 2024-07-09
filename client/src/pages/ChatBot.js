import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatBot.css';
import { AuthContext } from './AuthContext';

const UserMessage = ({ message }) => (
  <Card className="user-card mt-3">
    <Card.Body>
      <h2 className="font-weight-bold">You</h2>
      <p className="text-muted">{message}</p>
    </Card.Body>
  </Card>
);

const AIMessage = ({ message, onCopy }) => (
  <Card className="ai-card mt-3">
    <Card.Body className="d-flex flex-column align-items-start">
      <div>
        <h2 className="font-weight-bold">AI Bot</h2>
        <p className="text-muted">{message}</p>
      </div>
      <Button className="btn btn-outline-custom btn-copy mt-2" onClick={onCopy}>
        <span style={{ color: 'black' }}>Copy</span>
      </Button>
    </Card.Body>
  </Card>
);
function ChatBot() {
  const { state } = useContext(AuthContext);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [aiResponse, setAiResponse] = useState({
    text: '',
    loading: false,
    error: null,
  });

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    if (question.trim() === '') {
      // Validate input before making the API call
      alert('Please enter a question before sending.');
      return;
    }

    setLoading(true);
    fetchResponse();
  };

  const fetchResponse = async () => {
    try {
      const response = await fetch('/api/v1/ai/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ text: question }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the server');
      }

      const data = await response.json();

      if (data.answer) {
        setAiResponse({ text: data.answer, loading: false, error: null });
        setChatHistory((prevChatHistory) => [
          { question, answer: data.answer },
          ...prevChatHistory,
        ]);
        setQuestion('');
      } else {
        throw new Error('Empty response from the server');
      }
    } catch (error) {
      console.error('Error fetching response:', error.message);
      setAiResponse({ text: '', loading: false, error: 'Error generating the paragraph. Please try again.' });
    } finally {
      setLoading(false);
      setQuestion(''); // Set loading to false after API call completes
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container fluid className="chat-container">
      <Row className="chat-row">
        <Col md={16} className="chat-col">
          <div className="container p-5">
            <h1 className="text-center">AI Chatbot</h1>
            <ListGroup className="chat-list">
              {chatHistory.slice().reverse().map((item, index) => (
                <React.Fragment key={index}>
                  <UserMessage message={item.question} />
                  <AIMessage
                    message={item.answer}
                    onCopy={() => {
                      navigator.clipboard.writeText(item.answer)
                        .then(() => {
                          alert('AI response copied to clipboard!');
                        })
                        .catch((error) => {
                          console.error('Failed to copy AI response: ', error);
                        });
                    }}
                  />
                </React.Fragment>
              ))}
            </ListGroup>
            {loading && (
              <div className="mt-5 text-center">
                <Spinner animation="border" role="status" size="lg" style={{ color: '#3498db' }}>
                  <span className="sr-only">Loading...</span>
                </Spinner>
                <div className="mt-2">
                  AI is Typing...
                </div>
              </div>
            )}
            {aiResponse.error && (
              <div className="mt-5 text-center text-danger">
                {aiResponse.error}
              </div>
            )}
            <div className="mt-5 text-center">
              <label htmlFor="message">Your message</label>
              <textarea className="form-control" id="message" value={question} onChange={handleChange} placeholder="Type your message here"></textarea>
              <Button className="btn btn-primary mt-3" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatBot;