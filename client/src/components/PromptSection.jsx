// PromptSection.js

import React from 'react';
import promptData from './PromptData';
import PromptCard from './PromptCard';

const PromptSection = () => {
  return (
    <section className="blogsection d-flex justify-content-center align-items-center mt-5">
      <div className="container text-center">
        <div className="detail-box">
        <div className="heading_container heading_center">
        <h2 className>
        Image Generation <span> Samples</span>
        </h2>
      </div>
        </div>
        <div className="row mt-1">
          {promptData.map((blog) => (
            <PromptCard
              key={blog.id}
              image={blog.image}
              prompt={blog.prompt}
              type={blog.Type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromptSection;
