import { MagnifingGlasses } from "@/assets/icons";
import React from "react";
import { CustomButton } from ".";

const Header = () => {
  return (
    <header className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="md:flex items-center hidden ">
            <div>
              <nav className="space-x-4">
                <a href="#" className="text-white hover:text-gray-600">
                  Home
                </a>
                <a href="#" className="text-white hover:text-gray-600">
                  About
                </a>
                <a
                  href="https://t.me/Rsm_Eth"
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
