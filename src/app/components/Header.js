import { MagnifingGlasses } from "@/assets/icons";
import React from "react";
import { SiteLogo } from "@/assets/icons";
import { CustomButton } from ".";

const Header = () => {
  return (
    <header className="bg-[#050808] bg-opacity-5 backdrop-filter backdrop-blur-lg fixed top-0 left-0 w-full z-10 shadow-md border-b-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="md:flex items-center hidden ">
            <div>
              <nav className="space-x-4 items-center flex">
                <a
                  href="https://fourtis.io"
                  className="text-white hover:text-gray-600"
                >
                  Home
                </a>
                <a
                  href="https://fourtis.io/coin-news-details/crypto/1/100000"
                  className="text-white hover:text-gray-600"
                >
                  About
                </a>
                <a
                  href="https://t.me/fourtisglobal"
                  className="text-white hover:text-gray-600"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:w-[30%] flex-row gap-2">
            <w3m-network-button></w3m-network-button>
            <w3m-account-button />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
