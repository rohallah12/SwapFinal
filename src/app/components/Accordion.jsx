import React, { useState } from "react";

const Accordion = ({ name, name2, children }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="">
      <div className="bg-black rounded m-0 my-2">
        <button
          className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-black rounded-t hover:bg-black rounded focus:outline-none font-bold"
          onClick={() => toggleAccordion(1)}
        >
          {name}
          <span className="flex align-middle ">
            {name2}
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                activeIndex === 1 ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            activeIndex === 1 ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className=" text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
