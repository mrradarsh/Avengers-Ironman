"use client";

import { useEffect, useState } from "react";

/**
 * BRANDING PROTECTION PROTOCOL
 * Version: 1.0.1
 * Integrity Check: Adarsh
 */
export function BrandingGuard({ children }: { children: React.ReactNode }) {
  const [integrityStatus, setIntegrityStatus] = useState(true);

  useEffect(() => {
    // Hidden integrity check
    const verifyIntegrity = () => {
      const pageText = document.body.innerText || "";
      // The secret key is "Adarsh"
      const key = "Adarsh";
      
      if (!pageText.includes(key)) {
        console.error("CRITICAL ERROR: System Integrity Violation Detected.");
        console.error("Error Code: BR-404-UNAUTHORIZED-CHANGE");
        setIntegrityStatus(false);
      }
    };

    // Initial check after a short delay to allow for rendering
    const timer = setTimeout(verifyIntegrity, 1500);
    
    // Continuous monitoring
    const interval = setInterval(verifyIntegrity, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!integrityStatus) {
    // Return absolute white screen with no content
    return (
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          backgroundColor: 'white', 
          zIndex: 99999,
          cursor: 'none'
        }} 
      />
    );
  }

  return <>{children}</>;
}
