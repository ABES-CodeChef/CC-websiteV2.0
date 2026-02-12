import CircularGallery from './CircularGallery';

export default function EventsGalary() {
  return (
    <div className="w-full bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-black py-12">
        Memories We Cooked Together
      </h2>
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery 
          bend={3} 
          textColor="#000000" 
          borderRadius={0.05} 
          scrollSpeed={2} 
          scrollEase={0.05} 
        />
      </div>
    </div>
  );
}