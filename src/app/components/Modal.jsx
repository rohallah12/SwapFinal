"use client";
import { MagnifingGlasses, X } from "@/assets/icons";
import React, { useEffect, useState } from "react";
import MiniModal from "./MiniModal";
import Logo from "./Logo";
import ERC20ABI from "../../data/abis/ERC20ABI.json";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers } from "ethers";

export default function Modal({
  open,
  handleOpen,
  setSelectedToken,
  selectedToken,
  provider,
  handleSelect,
  Tokens,
}) {
  const [Coins, setCoins] = useState([]);
  const { chainId } = useWeb3ModalAccount();
  const [showModal, setShowModal] = useState(false);
  const [targetToken, setTargetToken] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectCoin = (token) => {
    if (open == 1) {
      if (selectedToken?.[1].symbol == token.symbol) {
        handleSelect([token, {}], 0);
      } else {
        handleSelect([token, selectedToken[1]], 0);
      }
    } else if (open == 2) {
      if (selectedToken?.[0].symbol == token.symbol) {
        handleSelect([{}, token], 1);
      } else {
        handleSelect([selectedToken[0], token], 1);
      }
    }
    handleOpen(0);
  };

  useEffect(() => {
    setCoins(Tokens);
  }, [Tokens]);

  useEffect(() => {
    setTargetToken({});
  }, [open]);

  const onSearchInput = async (e) => {
    const value = e.target.value;
    if (value.substring(0, 2) != "0x") {
      const availableTokens = Tokens ? Tokens : [];
      const filteredCoins = availableTokens.filter(
        (coin) =>
          coin.name.toLowerCase().includes(value) ||
          coin.symbol.toLowerCase().includes(value)
      );
      setCoins(filteredCoins);
    } else {
      if (ethers.isAddress(value)) {
        setLoading(true);
        //find the token name and symbol
        const _token = Tokens.find((t) => t.address == value);
        if (_token) {
          setTargetToken(_token);
        } else {
          const tokenContract = new ethers.Contract(value, ERC20ABI, provider);
          try {
            const name = await tokenContract.name();
            const symbol = await tokenContract.symbol();
            const decimals = await tokenContract.decimals();
            const icon = "";
            setTargetToken({
              address: value,
              name,
              symbol,
              decimals,
              icon,
            });
          } catch (e) {
            console.log(e);
          }
        }
        setLoading(false);
      }
    }
  };

  return (
    <>
      {open !== 0 ? (
        <>
          <div className="transition duration-500 ease-in-out justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="mt-3 border border-gray-900 overflow-hidden w-[90%] md:w-[60%] lg:w-[28%] bg-black rounded-3xl relative my-6 mx-auto max-w-3xl">
              <MiniModal showModal={showModal} toggleModal={toggleModal} />
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className=" flex items-center justify-between p-5 border-solid border-blueGray-200 rounded-t">
                  <h6 className="text-xl font-semibold text-white">
                    Select a token
                  </h6>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleOpen(0)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <X fill={"white"} size={20} />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-0 flex-auto">
                  <div className="p-6 py-3 flex justify-between">
                    <div className="flex items-center justify-start px-2 w-[100%] rounded bg-gray-900 h-9">
                      <MagnifingGlasses fill={"gray"} size={20} />
                      <input
                        style={{
                          opacity: loading ? "0.7" : "1",
                          pointerEvents: loading ? "none" : "all",
                        }}
                        onChange={onSearchInput}
                        placeholder="Search name or paste address"
                        className=" px-2 rounded text-white outline-none bg-gray-900 w-[95%] h-9"
                      />
                    </div>
                  </div>
                  {targetToken.address && (
                    <div
                      onClick={() => handleSelectCoin(targetToken)}
                      className="hover:cursor-pointer px-5 py-2 hover:bg-gray-900 w-full text-white bg-black"
                    >
                      <div className="flex items-center justify-start">
                        <Logo token={targetToken}></Logo>
                        <div className=" ps-2">
                          <div>{targetToken.symbol}</div>
                          <div className="text-gray-500 text-xs">
                            {targetToken.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 px-6 flex">
                    {Coins.slice(0, Math.min(4, Coins.length)).map(
                      (token, index) => {
                        return (
                          <button
                            key={index}
                            onClick={() => handleSelectCoin(token)}
                            className="hover:bg-gray-800 mx-1 flex items-center justify-between w-20 text-white bg-black px-2 border border-white rounded-full"
                          >
                            <Logo token={token}></Logo>
                            <span>{token.symbol}</span>
                          </button>
                        );
                      }
                    )}
                  </div>
                  <div className="border-t border-gray-900 scroll border-solid border-blueGray-200 mt-5">
                    <div>
                      <span className="text-gray-500 text-sm ps-6 font-bold ">
                        Tokens
                      </span>
                    </div>
                    {Coins.map((token, index) => {
                      let IconComponent = token.icon;
                      return (
                        <div
                          key={index}
                          onClick={() => handleSelectCoin(token)}
                          className="hover:cursor-pointer px-5 py-2 hover:bg-gray-900 w-full text-white bg-black"
                        >
                          <div className="flex items-center justify-start">
                            <Logo token={token}></Logo>
                            <div className=" ps-2">
                              <div>{token.symbol}</div>
                              <div className="text-gray-500 text-xs">
                                {token.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
