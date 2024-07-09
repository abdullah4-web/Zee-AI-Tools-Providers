/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { css } from '@emotion/react';

import { Spinner } from 'react-bootstrap';
import { AuthContext } from './AuthContext';

function PinCodePrompt({ setHTML, setCSS, setJS }) {
  const { state } = useContext(AuthContext);
  const [instructions, setInstructions] = useState('');
  const [cost, setCost] = useState(0.72 / 1000);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [generatedJS, setGeneratedJS] = useState('');

  const API_ENDPOINT = '/api/v1/ai/codegenerator'; // Update with your actual API endpoint

  async function callAPI() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ instructions }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const { htmlCode, cssCode, jsCode } = data;

      setGeneratedHTML(htmlCode);
      setGeneratedCSS(cssCode);
      setGeneratedJS(jsCode);

      setHTML(htmlCode);
      setCSS(cssCode);
      setJS(jsCode);
    } catch (error) {
      console.error('API call error:', error);
      setError('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <div className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
        <div className="text-center">
          <Spinner animation="border" role="status"size="lg" >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
        </div>
      ) : (
        <textarea
          value={instructions}
          placeholder='Enter Instructions to create code with AI'
          onChange={(e) => setInstructions(e.target.value)}
          style={{ width: '80%', minHeight: '100px', margin: '5px', padding: '10px' }}
        />
      )}
      <div style={{ textAlign: 'center' }}>
        <button
          id="api-button"
          type="button"
          onClick={callAPI}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          <span>Generate Code</span>
        </button>

        <div style={{ marginTop: '20px' }}>
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
      </div>
    </div>
  );
}

export default PinCodePrompt;
