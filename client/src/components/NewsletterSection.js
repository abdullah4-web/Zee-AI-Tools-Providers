import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // Import the paper plane icon
import newsletterImage from '../img/newsletter.png'; // Make sure to import the image file

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    // Implement your logic to handle the email subscription here
    // For example, you can send the email value to a server or perform some client-side action
    console.log('Subscribing to newsletter:', email);
    // You can reset the email input field after processing if needed
    setEmail('');
  };

  return (
    <div className="container-fluid bg-primary newsletter py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-md-5 ps-lg-0 pt-5 pt-md-0 text-start wow fadeIn" data-wow-delay="0.3s">
            <img className="img-fluid" src={newsletterImage} alt="Newsletter" />
          </div>
          <div className="col-md-7 py-5 newsletter-text wow fadeIn" data-wow-delay="0.5s">
            <div className="btn btn-sm border rounded-pill text-white px-3 mb-3">Newsletter</div>
            <h1 className="text-white mb-4">Let's subscribe to the newsletter</h1>
            <div className="position-relative w-100 mt-3 mb-2">
              <input
                className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                type="text"
                placeholder="Enter Your Email"
                style={{ height: '48px' }}
                value={email}
                onChange={handleEmailChange}
              />
              <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2" onClick={handleSubscribe}>
                <FaPaperPlane className="text-primary fs-4" /> {/* Use the FaPaperPlane icon */}
              </button>
            </div>
            <small className="text-white-50">Diam sed sed dolor stet amet eirmod</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
