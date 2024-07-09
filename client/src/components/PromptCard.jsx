import React from 'react';

const PromptCard = ({ image, prompt, type }) => {
  return (
    <div className="col-md-4 mb-5">
      <div className="card h-100">
        <img src={image} alt={prompt} className="card-img-top" />
        <div className="card-body">
          <h4 className="card-title">Prompt: "{prompt} "</h4>
          <h4 className="card-text">{type}</h4>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;