import './App.css';
import hero from './img/hero-bg.png'
import Slider from './components/Slider';
import Tools from './pages/Tools';
import AboutUs from './components/AboutSection';
import PromptSection from './components/PromptSection';
import Info from './components/Info';
import Team from './components/Team';

function HomePage() {
  return (
    <>
  
  <Team />
      <Slider />
      <Tools />
      <AboutUs />
      <PromptSection />
      
     
    </>
  );
}

export default HomePage;
