/**
 * useResponsive Hook
 * 
 * Custom hook for responsive design utilities
 * Provides breakpoint detection and device type identification
 * 
 * @returns {Object} Responsive utilities object
 */
import { useState, useEffect } from 'react';

const useResponsive = () => {
  // State for tracking window dimensions and device type
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [deviceType, setDeviceType] = useState('desktop');

  // Breakpoint definitions (matching Tailwind CSS breakpoints)
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  /**
   * Update dimensions and device type on window resize
   */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });
      
      // Determine device type based on width
      if (width < breakpoints.sm) {
        setDeviceType('mobile');
      } else if (width < breakpoints.md) {
        setDeviceType('tablet');
      } else if (width < breakpoints.lg) {
        setDeviceType('laptop');
      } else {
        setDeviceType('desktop');
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Check if current screen size matches a breakpoint
   * @param {string} breakpoint - Breakpoint to check ('sm', 'md', 'lg', 'xl', '2xl')
   * @returns {boolean} Whether the screen matches the breakpoint
   */
  const isBreakpoint = (breakpoint) => {
    return dimensions.width >= breakpoints[breakpoint];
  };

  /**
   * Check if current screen size is smaller than a breakpoint
   * @param {string} breakpoint - Breakpoint to check
   * @returns {boolean} Whether the screen is smaller than the breakpoint
   */
  const isBelowBreakpoint = (breakpoint) => {
    return dimensions.width < breakpoints[breakpoint];
  };

  /**
   * Check if current screen size is larger than a breakpoint
   * @param {string} breakpoint - Breakpoint to check
   * @returns {boolean} Whether the screen is larger than the breakpoint
   */
  const isAboveBreakpoint = (breakpoint) => {
    return dimensions.width >= breakpoints[breakpoint];
  };

  /**
   * Get responsive value based on current breakpoint
   * @param {Object} values - Object with breakpoint keys and corresponding values
   * @returns {any} The appropriate value for current breakpoint
   */
  const getResponsiveValue = (values) => {
    const sortedBreakpoints = Object.keys(breakpoints).sort(
      (a, b) => breakpoints[a] - breakpoints[b]
    );

    for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
      const breakpoint = sortedBreakpoints[i];
      if (dimensions.width >= breakpoints[breakpoint] && values[breakpoint] !== undefined) {
        return values[breakpoint];
      }
    }

    // Return default value if no breakpoint matches
    return values.default || values.mobile || Object.values(values)[0];
  };

  return {
    dimensions,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isLaptop: deviceType === 'laptop',
    isDesktop: deviceType === 'desktop',
    isBreakpoint,
    isBelowBreakpoint,
    isAboveBreakpoint,
    getResponsiveValue,
    breakpoints,
  };
};

export default useResponsive;
