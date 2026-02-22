import CircularGallery from './CircularGallery';

export default function EventsGalary() {
  return (
    <div className="w-full bg-black py-20">
      <h1 className="text-5xl md:text-7xl font-bold text-center mb-16 text-white">
        Memories that we <span className="text-orange-500">cooked together</span>
      </h1>
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery 
          bend={3} 
          textColor="#ffffff" 
          borderRadius={0.05} 
          scrollSpeed={2} 
          scrollEase={0.05} 
        />
      </div>
    </div>
  );
}