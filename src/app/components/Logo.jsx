import React, { useEffect } from "react";
import { Unknown } from "@/assets/icons";

const Logo = ({ token }) => {
  if (token.icon) {
    return <img src={token.icon} width={24} className="rounded-2xl"></img>;
  } else {
    return <Unknown fill={"#000"} size={20}></Unknown>;
  }
};

export default Logo;
