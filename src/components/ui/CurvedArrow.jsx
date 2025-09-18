/**
 * CurvedArrow Component
 * 
 * SVG curved arrow connecting the name to the portfolio title
 * Positioned dynamically based on content layout
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.startX - Starting X position
 * @param {number} props.startY - Starting Y position
 * @param {number} props.endX - Ending X position
 * @param {number} props.endY - Ending Y position
 * @returns {JSX.Element} CurvedArrow component
 */
import React from 'react';

const CurvedArrow = ({ startX = 0, startY = 0, endX = 0, endY = 0 }) => {
  // Calculate control points for smooth curve
  const controlX1 = startX + (endX - startX) * 0.5;
  const controlY1 = startY - 20;
  const controlX2 = endX - (endX - startX) * 0.3;
  const controlY2 = endY - 10;

  return (
    <svg 
      className="curved-arrow"
      style={{
        left: Math.min(startX, endX) - 10,
        top: Math.min(startY, endY) - 20,
        width: Math.abs(endX - startX) + 20,
        height: Math.abs(endY - startY) + 40,
      }}
      viewBox={`0 0 ${Math.abs(endX - startX) + 20} ${Math.abs(endY - startY) + 40}`}
    >
      <path
        d={`M ${startX - Math.min(startX, endX) + 10} ${startY - Math.min(startY, endY) + 20} 
            C ${controlX1 - Math.min(startX, endX) + 10} ${controlY1 - Math.min(startY, endY) + 20}, 
              ${controlX2 - Math.min(startX, endX) + 10} ${controlY2 - Math.min(startY, endY) + 20}, 
              ${endX - Math.min(startX, endX) + 10} ${endY - Math.min(startY, endY) + 20}`}
        stroke="#000000"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Arrow head */}
      <path
        d={`M ${endX - Math.min(startX, endX) + 10 - 8} ${endY - Math.min(startY, endY) + 20 - 4} 
            L ${endX - Math.min(startX, endX) + 10} ${endY - Math.min(startY, endY) + 20} 
            L ${endX - Math.min(startX, endX) + 10 - 8} ${endY - Math.min(startY, endY) + 20 + 4}`}
        stroke="#000000"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CurvedArrow;
