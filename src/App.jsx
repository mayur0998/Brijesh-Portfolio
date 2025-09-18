/**
 * Main App Component
 * 
 * Portfolio application matching the second image design
 * Features navigation, elegant typography, and interactive elements
 * 
 * @component
 * @returns {JSX.Element} Main App component
 */
import React from 'react';
import { AnimatedSquares, Header, Navigation } from '@/components';
import { useResponsive } from '@/hooks';
import 'segoe-fonts';

function App() {
  // Get responsive utilities
  const { isMobile, deviceType } = useResponsive();

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#F2F1E0' }}>
      {/* Top Navigation */}
      <Navigation />
      
      {/* Animated Background Squares */}
      <AnimatedSquares 
        speed={isMobile ? 0.2 : 0.3} // Very subtle animation
        squareSize={isMobile ? 30 : 70} // Smaller, more subtle squares
        direction="down"
        borderColor="rgb(255, 255, 255)" // More subtle border
        hoverFillColor="rgb(255, 253, 253)" // Dark hover effect
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <main className="relative z-30">
        <Header/>
      </main>
    </div>
  );
}

export default App
