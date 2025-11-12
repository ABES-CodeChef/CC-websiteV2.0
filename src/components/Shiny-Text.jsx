const ShinyText = ({ text, disabled = false, speed = 5, className = '', style = {} }) => {
  const animationDuration = `${speed}s`;

  // Inline keyframes injection to ensure the animation works even if Tailwind is not configured.
  // This will add the keyframes once per module import (duplicate tags are harmless in dev).
  const keyframes = `@keyframes shine { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }`;

  const baseStyle = {
    backgroundImage:
      'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    display: 'inline-block'
  };

  const animationStyle = disabled
    ? {}
    : {
        animationName: 'shine',
        animationDuration: animationDuration,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
      };

  const combinedStyle = { ...baseStyle, ...animationStyle, ...style };

  return (
    <>
      <style>{keyframes}</style>
      <div
        className={`text-[#b5b5b5a4] bg-clip-text ${className}`}
        style={combinedStyle}
      >
        {text}
      </div>
    </>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
