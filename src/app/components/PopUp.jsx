import React, { useState, useRef, useEffect } from "react";

const Popup = ({ isOpen, setIsOpen, children }) => {
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute top-8 right-1 mt-2 right-0 bg-black min-w-[18rem] md:min-w-[25rem] shadow-lg rounded p-3 z-10"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popup;
