import React from 'react';
import PixelTransition from './Pixel-Transition';
import ShinyText from './Shiny-Text';

const About = () => {
  return (
    <div  className="about-container" style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem'
    }}>
      {/* text ma effect add hoga yaha se left side m */}
      <div className="about-content" style={{
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2rem'
      }}>
        <ShinyText 
          text="Discover" 
          disabled={false} 
          speed={3} 
          className='about-title'
          style={{ fontSize: '3.5rem', color: '#1c1919', fontWeight: 700 }}
        />
        <ShinyText 
          text="Our Bawarchikhaana" 
          disabled={false} 
          speed={3} 
          className='about-subtitle'
          style={{ fontSize: '2.25rem', color: '#1c1919', fontWeight: 600 }}
        />
        <div className="about-text" style={{ color: '#444', fontSize: '1.1rem', lineHeight: '1.8' }}>
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

      {/*Images*/}
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
          style={{ width: '527px', height: '750px' }}
        />
      </div>
    </div>
  );
};

export default About;