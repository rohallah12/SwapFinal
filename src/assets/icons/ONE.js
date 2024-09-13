import React from "react";

const ONE = ({ fill = "#00AEE9", size = 50 }) => (
  <svg
    fill={fill}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
  >
    <circle cx="500" cy="500" r="400" />
  </svg>
);

export default ONE;
