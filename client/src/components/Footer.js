import React, { useEffect, useState } from 'react';
import Info from './Info';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year dynamically
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
    <Info />
    <section className="footer_section">
      <div className="container">
        <p>
          &copy; <span id="displayYear">{currentYear}</span> All Rights Reserved By
          <a href="https://abdullahshahportfolio.netlify.app/">Developed by Abdullah</a>
        </p>
      </div>
    </section>
    </>
  );
};

export default Footer;
