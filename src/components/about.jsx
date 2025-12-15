import React from 'react';
import PixelTransition from './Pixel-Transition';
import ShinyText from './Shiny-Text';

const About = () => {
  return (
    <div className="about-container" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem'
    }}>
      <style>
        {`
          @media (min-width: 768px) {
            .about-container {
              flex-direction: row !important;
            }
            .about-content {
              padding: 2rem !important;
            }
            .about-images {
              padding: 2rem !important;
            }
          }
          
          @media (max-width: 767px) {
            .about-container {
              padding: 1rem !important;
            }
            .about-content {
              padding: 1rem !important;
              gap: 1rem !important;
            }
            .about-title {
              font-size: 2.5rem !important;
            }
            .about-subtitle {
              font-size: 1.75rem !important;
            }
            .about-text {
              font-size: 1rem !important;
            }
            .about-images {
              padding: 1rem !important;
              margin-top: 2rem !important;
            }
            .about-image-transition {
              width: 100% !important;
              max-width: 400px !important;
              height: 500px !important;
            }
          }
        `}
      </style>

      <div className="about-content" style={{
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <ShinyText 
          text="Discover" 
          disabled={false} 
          speed={3} 
          className='about-title'
          style={{ fontSize: '3.5rem', color: '#1c1919', fontWeight: 700, lineHeight: '1.2' }}
        />
        <ShinyText 
          text="Our Bawarchikhaana" 
          disabled={false} 
          speed={3} 
          className='about-subtitle'
          style={{ fontSize: '2.25rem', color: '#1c1919', fontWeight: 600, marginTop: '-0.5rem', lineHeight: '1.2' }}
        />
        <div className="about-text" style={{ 
          color: '#444', 
          fontSize: '1.1rem', 
          lineHeight: '1.8',
          marginTop: '1rem'
        }}>
          <p><strong>CODECHEF ABESEC</strong> We are a group of programmers with a passion for coding and teamwork. 
          Hum to bas ek hi funda follow karte hain – 'Teamwork makes the dream work!' 😉 
          We develop a process for solving problems through collaboration.</p>
          
          <p>Our departments thrive on the collision of different perspectives, encouraging learning, 
          experimentation, and innovation. This collective talent ensures we consistently achieve 
          results that exceed expectations while embracing the limitless potential of our community. 
          Yahan possibilities ki koi limit nahi hai – bas #TechChefs ke saath bane rahiye aur coding 
          yatra ko "Chaliye shuru karte hain"</p>
        </div>
      </div>

      <div className="about-images" style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <PixelTransition
          firstContent={
            <img
              src="/cc.png"
              alt="CodeChef ABESEC"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          }
          secondContent={
            <img
              src="/file.png"
              alt="CodeChef File"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          }
          gridSize={12}
          pixelColor='#ffffff'
          once={false}
          animationStepDuration={0.4}
          className="about-image-transition"
          style={{ width: '480px', height: '670px' }}
        />
      </div>
    </div>
  );
};

export default About;