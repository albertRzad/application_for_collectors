import "../css/Home.css"
import "../css/Cards.css"
import React, { useState, useEffect } from 'react';
import Cards from './Cards';


const Home = () => {
    return (
        <>
      <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <Cards />
      </div>
    </>
  );
  };

export default Home;