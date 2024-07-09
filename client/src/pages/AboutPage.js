import React, { useEffect } from 'react'
import AboutSection from '../components/AboutSection'
const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>

    <AboutSection />
    </>
  )
}

export default AboutPage
