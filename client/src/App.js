import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';

import ContactForm from './pages/Contact';
import PageNotFound from './pages/Error';
import ChatBot from './pages/ChatBot';

import Paragraph from './pages/Paragraph';
import JSConverter from './pages/JSConverter';
import ImageGenerator from './pages/ImageGenerator';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductSearch from './pages/ProductSearch';
import JobSearch from './pages/JobSearch';
import ImageCapture from './pages/ImageCapture';
import YouTubeTitles from './pages/YoutubeTitles';
import BlogTitles from './pages/BlogTitles';
import AiPenCode from './pages/AiPenCode';
import ProtectedRoute from '../src/ProtectedRoute';
import NavBar from './components/NavBar';
import ArticleGenerator from './pages/ArticleGenerator';
import OTP from './pages/Otp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TextToImage from './pages/TexttoImage';
import ImageToVideo from './pages/ImageToVideo';
import Tools from './pages/Tools';
import TextToSpeech from './components/TextToSpeech';
import TextToVideo from './pages/TextToVideo';
import CartoonifyVideoForm from './pages/CartoonifyVideoForm';
import ChangeBackgroundForm from './pages/ChangeBackgroundForm';
import VideoCrafter from './pages/VideoCrafter';
import InfiniteZoom from './pages/InfiniteZoom';
import LantanaVideo from './pages/LantanaVideo';
import WordBomber from './pages/WordBomber';




const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/otp" element={<OTP />} />
      <Route path="/wordbomber" element={<WordBomber />} />
      <Route path="/lantanavideo" element={<LantanaVideo />} />
      <Route path="/infinitezoom" element={<InfiniteZoom />} />
      <Route path="/videocrafter" element={<VideoCrafter />} />
      <Route path="/CartoonifyVideoForm" element={<CartoonifyVideoForm />} />
      <Route path="/changebgvideo" element={<ChangeBackgroundForm />} />
      <Route path="/texttovideo" element={<TextToVideo />} />
      <Route path="/chat" element={<ProtectedRoute><ChatBot /></ProtectedRoute>} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/proimagegenerator" element={<TextToImage />} />
      <Route path="/imagetovideo" element={<ImageToVideo />} />
      <Route path="/texttospeech" element={<TextToSpeech />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/jobsearch" element={<ProtectedRoute><JobSearch /></ProtectedRoute>} />
        <Route path="/articlewritting" element={<ProtectedRoute><ArticleGenerator /></ProtectedRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/psearch" element={<ProtectedRoute><ProductSearch /></ProtectedRoute>} />
       
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      
      
        <Route path="/imagecapture" element={<ProtectedRoute><ImageCapture /></ProtectedRoute>} />
        <Route path="/youtubetitles" element={<ProtectedRoute><YouTubeTitles /></ProtectedRoute>} />
        <Route path="/blogtitles" element={<ProtectedRoute><BlogTitles /></ProtectedRoute>} />
        <Route path="/aipencode" element={<ProtectedRoute><AiPenCode /></ProtectedRoute>} />

        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute><ChatBot /></ProtectedRoute>


          }
        ></Route>
        <Route
          path="/paragraph"
          element={
            <ProtectedRoute> <Paragraph /></ProtectedRoute>


          }
        ></Route>
       
        <Route
          path="/imagegenerator"
          element={
            <ProtectedRoute>
              <ImageGenerator />
            </ProtectedRoute>

          }
        ></Route>

        <Route
          path="/jsconverter"
          element={
            <ProtectedRoute>

              <JSConverter />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
     <Footer />
    </BrowserRouter>
  );
};

export default App;
