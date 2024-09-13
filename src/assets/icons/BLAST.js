import React from "react";

const BLAST = ({ fill = "#FF5733", size = 50 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width={size}
    height={size}
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="-0.5 -0.5 500 500"
  >
    <g>
      <path
        style={{ opacity: 1 }}
        fill="#000000"
        d="M -0.5,-0.5 C 166.167,-0.5 332.833,-0.5 499.5,-0.5C 499.5,166.167 499.5,332.833 499.5,499.5C 332.833,499.5 166.167,499.5 -0.5,499.5C -0.5,332.833 -0.5,166.167 -0.5,-0.5 Z"
      />
    </g>
    <g>
      <path
        style={{ opacity: 1 }}
        fill={fill}
        d="M 308.5,356.5 C 242.331,356.832 176.331,356.499 110.5,355.5C 127.785,299.982 145.451,244.648 163.5,189.5C 175.625,198.212 187.292,207.378 198.5,217C 187.656,249.365 177.322,281.865 167.5,314.5C 166.957,314.56 166.624,314.893 166.5,315.5C 218.204,316.171 269.871,316.838 321.5,317.5C 322.429,316.311 322.762,314.978 322.5,313.5C 327.843,296.82 333.176,280.153 338.5,263.5C 339.404,262.791 339.737,261.791 339.5,260.5C 302.663,260.832 265.996,260.498 229.5,259.5C 232.139,248.779 235.472,238.279 239.5,228C 276.498,227.5 313.498,227.333 350.5,227.5C 354.607,213.173 358.94,198.839 363.5,184.5C 364.043,184.44 364.376,184.107 364.5,183.5C 272.668,182.833 181.001,182.167 89.5,181.5C 107.288,168.885 124.955,156.052 142.5,143C 221.167,142.333 299.833,142.333 378.5,143C 390.461,150.976 401.795,159.643 412.5,169C 406.994,187.017 400.994,204.85 394.5,222.5C 377.677,230.745 361.011,239.245 344.5,248C 356.001,256.673 367.334,265.506 378.5,274.5C 372.459,293.585 366.126,312.585 359.5,331.5C 342.382,339.559 325.382,347.892 308.5,356.5 Z"
      />
    </g>
    <g>
      <path
        style={{ opacity: 1 }}
        fill="#313101"
        d="M 89.5,181.5 C 181.001,182.167 272.668,182.833 364.5,183.5C 364.376,184.107 364.043,184.44 363.5,184.5C 271.999,183.833 180.332,183.167 88.5,182.5C 88.6236,181.893 88.9569,181.56 89.5,181.5 Z"
      />
    </g>
    <g>
      <path
        style={{ opacity: 1 }}
        fill="#b7b701"
        d="M 229.5,259.5 C 265.996,260.498 302.663,260.832 339.5,260.5C 339.737,261.791 339.404,262.791 338.5,263.5C 302.176,261.837 265.509,260.837 228.5,260.5C 228.624,259.893 228.957,259.56 229.5,259.5 Z"
      />
    </g>
    <g>
      <path
        style={{ opacity: 1 }}
        fill="#caca02"
        d="M 322.5,313.5 C 322.762,314.978 322.429,316.311 321.5,317.5C 269.871,316.838 218.204,316.171 166.5,315.5C 166.624,314.893 166.957,314.56 167.5,314.5C 192.998,315.167 218.664,315.5 244.5,315.5C 270.714,315.491 296.714,314.824 322.5,313.5 Z"
      />
    </g>
    <g>
      <path
        style={{ opacity: 1 }}
        fill="#2a2a00"
        d="M 110.5,355.5 C 176.331,356.499 242.331,356.832 308.5,356.5C 242.332,357.832 175.999,357.832 109.5,356.5C 109.624,355.893 109.957,355.56 110.5,355.5 Z"
      />
    </g>
  </svg>
);

export default BLAST;