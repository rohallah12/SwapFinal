import React, { useState } from "react";

const ToggleSwitch = ({popUpValues,setPopUpValues}) => {
  const [enabled, setEnabled] = useState(false);

  const toggleSwitch = () => {
    setEnabled(!enabled);
    setPopUpValues({...popUpValues,tradeOption:!enabled})
  };

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={toggleSwitch}
        className={`${
          enabled ? "bg-blue-500" : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ease-in-out`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
