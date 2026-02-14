import React, { useEffect, useRef } from 'react';

// Helper for smooth animations
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

const RippleGridBackground = () => {
  const canvasRef = useRef(null);

  const config = {
    // VISUAL SETTINGS
    gridSize: 40,        // Slightly larger squares for a more modern look
    gap: 0,              // No gap = seamless grid (looks more like a surface)
    
    // COLOR GRADIENT (HSL)
    // Base: The resting state (Almost invisible)
    baseHue: 120,        // CodeChef Greenish
    baseSat: 15,         // Very desaturated
    baseLight: 2,        // 2% lightness (Very, very dark)

    // Active: The ripple state (Subtle glow)
    activeHue: 150,      // Shifts to Teal/Cyan when hovered
    activeSat: 30,       // Slightly more color
    activeLight: 10,     // Only goes up to 10% brightness (Subtle!)

    // ANIMATION PHYSICS
    mouseRadius: 400,    // Larger radius for a smoother gradient spread
    lerpFactor: 0.05,    // 0.05 is very slow and smooth (liquid feel)
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height, rows, cols;
    
    let grid = []; 
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const cellSize = config.gridSize + config.gap;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      
      grid = [];
      for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
          grid[i][j] = {
            intensity: 0, // 0 = Base State, 1 = Active State
          };
        }
      }
    };

    const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
       mouse.x = -1000;
       mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    resize(); 

    const render = () => {
      // Clear background with the base color
      ctx.fillStyle = `hsl(${config.baseHue}, ${config.baseSat}%, ${config.baseLight}%)`;
      ctx.fillRect(0, 0, width, height);

      const cellSize = config.gridSize + config.gap;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cell = grid[i][j];
          
          const cellX = i * cellSize;
          const cellY = j * cellSize;
          const centerX = cellX + config.gridSize / 2;
          const centerY = cellY + config.gridSize / 2;
          
          const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
          
          // Calculate Target Intensity
          let target = 0;
          if (dist < config.mouseRadius) {
              const normDist = dist / config.mouseRadius;
              // Cubic easing (1 - d)^3 for a much softer, gradient-like falloff
              target = Math.pow(1 - normDist, 3);
          }

          // Smooth interpolation
          cell.intensity = lerp(cell.intensity, target, config.lerpFactor);

          // Optimization: Only draw cells that aren't purely base state
          if (cell.intensity > 0.001) {
              // Interpolate Colors (Create the gradient transition)
              const h = lerp(config.baseHue, config.activeHue, cell.intensity);
              const s = lerp(config.baseSat, config.activeSat, cell.intensity);
              const l = lerp(config.baseLight, config.activeLight, cell.intensity);
              
              ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
              
              // No scale effect - simpler, cleaner, less distracting
              ctx.fillRect(cellX, cellY, config.gridSize, config.gridSize);
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default RippleGridBackground;