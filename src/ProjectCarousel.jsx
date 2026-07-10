import React, { useState, useEffect } from 'react';

const ProjectCarousel = ({ children, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter only img elements, just in case
  const images = React.Children.toArray(children).filter(child => child.type === 'img');

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="project-carousel">
      {images.map((img, index) => (
        <div 
          key={index} 
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          onClick={() => onImageClick && onImageClick(img.props.src)}
          style={{ cursor: 'zoom-in' }}
        >
          {React.cloneElement(img, { onClick: undefined })}
        </div>
      ))}
    </div>
  );
};

export default ProjectCarousel;
