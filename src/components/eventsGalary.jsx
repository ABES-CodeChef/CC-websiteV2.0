import CircularGallery from './CircularGallery';

export default function EventsGalary() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery 
        bend={3} 
        textColor="#ffffff" 
        borderRadius={0.05} 
        scrollSpeed={2} 
        scrollEase={0.05} 
      />
    </div>
  );
}