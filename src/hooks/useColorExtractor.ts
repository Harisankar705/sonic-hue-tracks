
import { useEffect, useState } from "react";

const calculateAverageColor = (imageElement: HTMLImageElement): string => {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  
  if (!context) {
    return 'rgb(18, 18, 18)'; // fallback dark color
  }
  
  // Set canvas dimensions
  const width = imageElement.width || 50;
  const height = imageElement.height || 50;
  canvas.width = width;
  canvas.height = height;
  
  // Draw image to canvas
  context.drawImage(imageElement, 0, 0, width, height);
  
  // Get image data
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // Calculate average color
  let r = 0, g = 0, b = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  
  const pixelCount = data.length / 4;
  r = Math.round(r / pixelCount);
  g = Math.round(g / pixelCount);
  b = Math.round(b / pixelCount);
  
  // Make the color darker for better contrast with white text
  r = Math.max(0, Math.round(r * 0.5));
  g = Math.max(0, Math.round(g * 0.5));
  b = Math.max(0, Math.round(b * 0.5));
  
  return `rgb(${r}, ${g}, ${b})`;
};

export const useColorExtractor = (imageUrl: string | null | undefined) => {
  const [color, setColor] = useState("rgb(18, 18, 18)");
  const [gradient, setGradient] = useState("linear-gradient(to bottom, rgb(18, 18, 18), rgb(10, 10, 10))");
  
  useEffect(() => {
    if (!imageUrl) {
      setColor("rgb(18, 18, 18)");
      setGradient("linear-gradient(to bottom, rgb(18, 18, 18), rgb(10, 10, 10))");
      return;
    }
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const dominantColor = calculateAverageColor(img);
      setColor(dominantColor);
      
      // Create a gradient from the dominant color
      const colorValues = dominantColor.match(/\d+/g);
      if (colorValues && colorValues.length === 3) {
        const [r, g, b] = colorValues.map(Number);
        // Create a darker version for the gradient
        const darkerR = Math.max(0, r - 20);
        const darkerG = Math.max(0, g - 20);
        const darkerB = Math.max(0, b - 20);
        
        setGradient(`linear-gradient(to bottom, ${dominantColor}, rgb(${darkerR}, ${darkerG}, ${darkerB}))`);
      }
    };
    
    img.onerror = () => {
      setColor("rgb(18, 18, 18)");
      setGradient("linear-gradient(to bottom, rgb(18, 18, 18), rgb(10, 10, 10))");
    };
    
    img.src = imageUrl;
    
    return () => {
      // Clean up
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);
  
  return { color, gradient };
};
