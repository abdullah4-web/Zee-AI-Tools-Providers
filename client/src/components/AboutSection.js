import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="about_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="img-box">
              <img src="images/about-img.png" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              <h3>About Us</h3>
              <p style={{ textAlign: 'justify' }}>
                Welcome to our AI Tools Provider, where innovation meets expertise! We are a team of seasoned professionals specializing in Artificial Intelligence and Machine Learning. At the core of our mission is the commitment to creating, training, and deploying cutting-edge AI models.
                Our team's wealth of experience allows us to harness the power of AI and transform it into practical, user-friendly tools. Through meticulous training and deployment processes, we craft models that serve as the backbone for a range of applications. These models are the driving force behind the creation of tools that are not just advanced but also incredibly useful for our users.
                Whether you're seeking intelligent automation, predictive analytics, or innovative solutions, our AI tools are designed to meet your needs. Join us on the journey of exploration and empowerment as we pave the way for a future driven by the limitless possibilities of Artificial Intelligence.
              </p>
              <Link to="/" style={{ textDecoration: 'none' }}>
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
