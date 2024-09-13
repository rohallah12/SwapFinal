import {  Check } from "@/assets/icons";
import { networks } from "@/data/networks";
import React from "react";

const Modal = ({ show, onClose }) => {
  if (!show) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className=" fixed inset-0 bg-opacity-50 "
      onClick={handleOverlayClick}
    >
      <div className="overlay"></div>
      <div
        className="bg-black overflow-hidden border border-gray-300 w-[30%]
       md:w-[25%] lg:w-[15%] h-auto absolute top-56 scroll right-[10%] md:right-[24%] lg:right-[37%] rounded-lg"
      >
        
        {networks.map((item, index) => (
          <button
            key={index}
            className="hover:cursor-pointer m-2 me-5 px-2 py-2 rounded-full
         justify-between hover:bg-gray-900 flex items-center w-[95%] text-white bg-black"
          >
            <div className="flex items-center">
              <span className="bg-white rounded">
                {<item.icon size={20} />}
              </span>
              <span className="ps-2">{item.name}</span>
            </div>
            {index == 0 ? <Check fill={"pink"} size={20} /> : ""}
          </button>
        ))}
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

const MiniModal = ({ showModal, toggleModal }) => {
  return (
    <div className=" relative z-50">
      <Modal show={showModal} onClose={toggleModal} />
    </div>
  );
};

export default MiniModal;
