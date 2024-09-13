import React, { useEffect } from "react";
import { Unknown } from "@/assets/icons";

const Logo = ({ token, size, svgSize }) => {
  if (token.icon) {
    return (
      <img
        src={token.icon}
        width={size ? size : 24}
        className="rounded-2xl"
      ></img>
    );
  } else {
    return <Unknown fill={"#000"} size={svgSize ? svgSize : 20}></Unknown>;
  }
};

export default Logo;
