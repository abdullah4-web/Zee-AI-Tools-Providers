import React, { useEffect, useState } from 'react';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://formspree.io/f/xqkveolz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccessMessage('Form submitted successfully! We will get back to you soon.');
      setErrorMessage('');
    } else {
      setErrorMessage('Oops! Something went wrong. Please try again later.');
      setSuccessMessage('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const containerStyle = {
    background: 'linear-gradient(130deg, #231a6f, #0f054c)',
    color: 'white',
  };

  return (
    <>
  
      <div className="container-fluid" style={containerStyle}>
        <div className="container py-1">
          <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
            <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">Contact Us</div>
            <h1 className="mb-4"  style={{ color: 'white' }}>If You Have Any Query, Please Contact Us</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              {successMessage && (
                <div className="alert alert-success mb-4">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger mb-4">{errorMessage}</div>
              )}
              <div className="wow fadeIn" data-wow-delay="0.3s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />
                        <label htmlFor="name"  style={{ color: 'black' }}>Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} />
                        <label htmlFor="email"  style={{ color: 'black' }}>Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} />
                        <label htmlFor="subject"  style={{ color: 'black' }}>Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a message here" id="message" name="message" style={{ height: '150px' }} value={formData.message} onChange={handleInputChange} />
                        <label htmlFor="message"  style={{ color: 'black' }}>Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-20 mb-3" type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default ContactForm;
