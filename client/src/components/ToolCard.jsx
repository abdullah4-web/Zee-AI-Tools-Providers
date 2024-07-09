import React from 'react';
import { Link } from 'react-router-dom';
import './ToolCard.css';

const ToolCard = ({ to, imgSrc, title, description }) => {
  return (
    <div className="box">
      <Link to={to} className="tool-link">
        <div className="tools-img">
          <img src={imgSrc} className="img1" alt={title} />
        </div>
        <div className="detail-box">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ToolCard;
