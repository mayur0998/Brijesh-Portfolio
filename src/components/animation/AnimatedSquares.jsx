/**
 * AnimatedSquares Component
 * 
 * This component creates an animated grid of squares that move across the screen
 * with interactive hover effects. It's optimized for performance and responsive design.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.direction - Animation direction: 'up', 'down', 'left', 'right', 'diagonal'
 * @param {number} props.speed - Animation speed multiplier (0.1 - 5)
 * @param {string} props.borderColor - Color of square borders
 * @param {number} props.squareSize - Size of each square in pixels
 * @param {string} props.hoverFillColor - Color when hovering over squares
 * @param {boolean} props.isMobile - Whether the device is mobile (for performance optimization)
 * @returns {JSX.Element} AnimatedSquares component
 */
import React, { useRef, useEffect, useCallback } from 'react';

const AnimatedSquares = ({
  direction = 'down',
  speed = 0.5,
  borderColor = '#ffffff',
  squareSize = 60,
  hoverFillColor = '#ffffff',
  isMobile = false
}) => {
  // Refs for canvas and animation control
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);
  const lastFrameTime = useRef(0);

  /**
   * Resize canvas to match viewport dimensions
   * Called on window resize and initial load
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas to full viewport dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calculate number of squares needed to cover the screen
    numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
    numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
  }, [squareSize]);

  /**
   * Draw the animated grid of squares
   * Optimized for performance with efficient rendering
   */
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate starting positions for grid rendering
    const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
    const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

    // Render squares in a grid pattern
    for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
      for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
        const squareX = x - (gridOffset.current.x % squareSize);
        const squareY = y - (gridOffset.current.y % squareSize);

        // Check if this square is being hovered
        const isHovered = hoveredSquareRef.current &&
          Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
          Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y;

        // Fill hovered squares
        if (isHovered) {
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(squareX, squareY, squareSize, squareSize);
        }

        // Draw square border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(squareX, squareY, squareSize, squareSize);
      }
    }
  }, [squareSize, borderColor, hoverFillColor]);

  /**
   * Update animation frame with throttling for performance
   * @param {number} currentTime - Current timestamp
   */
  const updateAnimation = useCallback((currentTime) => {
    // Throttle animation for mobile devices
    if (isMobile && currentTime - lastFrameTime.current < 16) {
      requestRef.current = requestAnimationFrame(updateAnimation);
      return;
    }
    
    lastFrameTime.current = currentTime;
    
    const effectiveSpeed = Math.max(speed, 0.1);
    
    // Update grid offset based on direction
    switch (direction) {
      case 'right':
        gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'left':
        gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'up':
        gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'down':
        gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'diagonal':
        gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
        gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
        break;
      default:
        break;
    }

    drawGrid();
    requestRef.current = requestAnimationFrame(updateAnimation);
  }, [direction, speed, squareSize, drawGrid, isMobile]);

  /**
   * Handle mouse movement for hover effects
   * @param {MouseEvent} event - Mouse move event
   */
  const handleMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
    const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

    const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
    const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

    // Update hovered square reference
    if (
      !hoveredSquareRef.current ||
      hoveredSquareRef.current.x !== hoveredSquareX ||
      hoveredSquareRef.current.y !== hoveredSquareY
    ) {
      hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
    }
  }, [squareSize]);

  /**
   * Handle mouse leave to clear hover effects
   */
  const handleMouseLeave = useCallback(() => {
    hoveredSquareRef.current = null;
  }, []);

  // Main effect hook for canvas setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    resizeCanvas();
    
    // Add event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(updateAnimation);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [resizeCanvas, handleMouseMove, handleMouseLeave, updateAnimation]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-screen border-none block pointer-events-auto"
      style={{ 
        background: 'transparent',
        zIndex: 1
      }}
    />
  );
};

export default AnimatedSquares;
