import React, { useEffect, useState } from "react";

interface OverlayProps {
  isVisible?: boolean; 
  closeOverlay?: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isVisible }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    // When visible, show immediately
    if (isVisible) setShow(true);
    else {
      // When hiding, wait for animation before removing from DOM
      const timeout = setTimeout(() => setShow(false), 300); // match duration
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    ></div>
  );
};

export default Overlay;
