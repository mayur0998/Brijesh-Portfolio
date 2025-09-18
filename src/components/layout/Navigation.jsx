/**
 * Navigation Component
 * 
 * Top navigation bar with three sections: About Me, LinkedIn, Resume
 * Features clean typography and subtle dividers
 * 
 * @component
 * @returns {JSX.Element} Navigation component
 */
import React from 'react';

const Navigation = () => {
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-sections">
          {/* About Me Section */}
          <div className="nav-section">
            <a href="#about" className="nav-link">
              About Me
            </a>
          </div>
          
          {/* LinkedIn Section */}
          <div className="nav-section">
            <a 
              href="https://linkedin.com/in/brijesh-solanki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn
            </a>
          </div>
          
          {/* Resume Section */}
          <div className="nav-section">
            <a href="#resume" className="nav-link">
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
