import React from 'react';
import { Link } from 'react-router-dom';
import './Info.css';

const Info = () => {
  return (
    <section className="info_section layout_padding2">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 info_col">
            <div className="info_contact">
              <h4>Address</h4>
              <div className="contact_link_box">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <i className="fa fa-map-marker" aria-hidden="true" />
                  <span>F6 ,Islamabad , Pakistan</span>
                </Link>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <i className="fa fa-phone" aria-hidden="true" />
                  <span>Call +92 332 5557457 </span>
                </Link>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <span>abdullah.shah7839@gmail.com</span>
                </Link>
              </div>
            </div>
            <div className="info_social">
              <Link to="#" style={{ textDecoration: 'none' }}>
                <i className="fa fa-facebook" aria-hidden="true" />
              </Link>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <i className="fa fa-twitter" aria-hidden="true" />
              </Link>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <i className="fa fa-linkedin" aria-hidden="true" />
              </Link>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <i className="fa fa-instagram" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 info_col">
            <div className="info_detail">
              <h4>Info</h4>
              <p>
                Necessary, making this the first true generator on the Internet. It
                uses a dictionary of over 200 Latin words, combined with a handful.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 mx-auto info_col">
            <div className="info_link_box">
              <h4>Links</h4>
              <div className="info_links">
                <Link className="active" to="/" style={{ textDecoration: 'none' }}>
                  Home
                </Link>
                <Link className to="/about" style={{ textDecoration: 'none' }}>
                  About
                </Link>
                <Link className to="/tools" style={{ textDecoration: 'none' }}>
                  Tools
                </Link>
                <Link className to="/contact" style={{ textDecoration: 'none' }}>
                 Contact Us
                </Link>
                <Link className to="/login"  style={{ textDecoration: 'none' }}>
                 Login
                </Link>
              </div>
            </div>
          </div> 
          <div className="col-md-6 col-lg-3 info_col ">
            <h4>Subscribe</h4>
            <form action="#">
              <input type="text" placeholder="Enter email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
