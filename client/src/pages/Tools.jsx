import React from 'react';
import ToolCard from '../components/ToolCard';
import toolsData from './toolsData.js'; // Import toolsData from the separate file

const Tools = () => {
  return (
    <section className="service_section layout_padding">
      <div className="container">
      <h2 style={{ textAlign: 'center' }}>Our Latest and tranied AI Tools</h2>
        <div className="service_container">
          {toolsData.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
        <div className="btn-box">
          <a href="#">Read More</a>
        </div>
      </div>
    </section>
  );
};

export default Tools;
