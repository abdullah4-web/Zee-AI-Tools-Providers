// SliderSection.js
import React from 'react';
import sliderimg from '../img/slider-img.png';
import { Link } from 'react-router-dom';
import "./Slider.css";

const SliderSection = () => {
  return (
    <div class="hero_area">

    <div class="hero_bg_box">
      <div class="bg_img_box">
        <img src="images/hero-bg.png" alt="" />
      </div>
    </div>
    <section className="slider_section">
      <div id="customCarousel1" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      Zee AI Tools Providers
                    </h1>
                    <p>Welcome to our website, your premier destination for the latest and most advanced AI tools. At the forefront of innovation, we deliver cutting-edge solutions designed to provide you with the best results. Explore our comprehensive suite of AI tools that harness the power of artificial intelligence to meet your diverse needs. Stay ahead of the curve and unlock the potential of state-of-the-art technologies with our platform, where excellence meets innovation. Discover the future of AI tools right here.
</p>
                    <div className="btn-box">
                      <Link to="/" className="btn1"  style={{ textDecoration: 'none' }}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box">
                    <img src={sliderimg} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Repeat the above structure for other carousel items as needed */}
        </div>
       
      </div>
    </section>
    </div>
  );
};

export default SliderSection;
