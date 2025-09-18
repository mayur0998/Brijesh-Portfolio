/**
 * Header Component
 * 
 * Main portfolio header matching the second image design
 * Features elegant typography with curved arrow connection
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The portfolio owner's name
 * @param {string} props.title - The main portfolio title
 * @param {string} props.subtitle - The professional subtitle
 * @returns {JSX.Element} Header component
 */
import React, { useRef, useEffect, useState } from 'react';
import CurvedArrow from '../ui/CurvedArrow';

const Header = ({ 
  name = "Brijesh Solanki", 
  title = "portfolio", 
  subtitle = "UI/UX Designer" 
}) => {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const [arrowCoords, setArrowCoords] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  useEffect(() => {
    const updateArrowPosition = () => {
      if (nameRef.current && titleRef.current) {
        const nameRect = nameRef.current.getBoundingClientRect();
        const titleRect = titleRef.current.getBoundingClientRect();
        
        setArrowCoords({
          startX: nameRect.right - 20,
          startY: nameRect.bottom - 10,
          endX: titleRect.left + 20,
          endY: titleRect.top + 20,
        });
      }
    };

    updateArrowPosition();
    window.addEventListener('resize', updateArrowPosition);
    
    return () => window.removeEventListener('resize', updateArrowPosition);
  }, []);

  return (
    <header className="header-container">
      <div className="header-content">
        {/* Name Section - Top Right */}
        <div className="name-section">
          <h1 ref={nameRef} className="name-text">
            {name}
          </h1>
        </div>

        {/* Main Title Section - Center */}
        <div className="title-section">
          <div ref={titleRef} className="portfolio-title">
            <span className="port-text">port</span>
            <span className="folio-text-fallback">folio</span>
          </div>
          
          {/* Subtitle */}
          <p className="portfolio-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Curved Arrow */}
        <CurvedArrow 
          startX={arrowCoords.startX}
          startY={arrowCoords.startY}
          endX={arrowCoords.endX}
          endY={arrowCoords.endY}
        />
      </div>
    </header>
  );
};

export default Header;
