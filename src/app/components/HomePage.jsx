"use client";
import { ChevronDown, ArrowDown, ETH, Gear } from "@/assets/icons/index";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from ".";
import { useWeb3ModalAccount, useWeb3Modal } from "@web3modal/ethers/react";
import { useNotifications } from "@toolpad/core";
import { Tokens } from "@/data/configs";
import Logo from "./Logo";
import { Providers } from "@/data/ChainData";
import { ethers, getBigInt } from "ethers";
import ERC20ABI from "@/data/abis/ERC20ABI";
import { getQoute } from "../paraswap/getQoute";
import { fixedPoint } from "../utils/decimals";
import CircularProgress from "@mui/material/CircularProgress";
import PercentIcon from "@mui/icons-material/Percent";
import Accordion from "./Accordion";
import Popup from "./PopUp";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ToggleSwitch from "./ToggleSwitch";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function Home() {
  const { open: openModal, close } = useWeb3Modal();
  const { chainId, address, isConnected } = useWeb3ModalAccount();
  const [defaultTokens, setDefaultTokens] = useState(Tokens[1]);
  const [open, setOpen] = React.useState(0);
  const [validity, setValidity] = React.useState(false);
  const [loadingRate, setLoadingRate] = React.useState(false);
  const [loadingApprove, setLoadingApprove] = React.useState(false);
  const [loadingSwap, setLoadingSwap] = React.useState(false);
  const [popUpValues, setPopUpValues] = React.useState({
    slippage: "auto",
    choosetype: "Auto",
    tradeOption: false,
  });
  const [provider, setProvider] = useState(
    new ethers.JsonRpcProvider(Providers[1])
  );

  const [balances, setBalances] = useState([
    ethers.getBigInt(0),
    ethers.getBigInt(0),
  ]);
  const notif = useNotifications();

  const [selectedToken, setSelectedToken] = React.useState([Tokens[1][0], {}]);
  const [amounts, setAmounts] = React.useState([0, 0]);
  const [lastChange, setLastChange] = React.useState(0);
  const [swaped, setSwaped] = React.useState(false);

  //Conversion Rates and prices
  const [rates, setRates] = useState([
    ethers.getBigInt(0),
    ethers.getBigInt(0),
  ]);

  //Swap States
  const [noLP, setNoLP] = useState(false);
  const [spender, setSpender] = useState("");
  const [allowance, setAllowance] = useState(ethers.getBigInt(0));
  const [txParams, setTxParams] = useState({});
  const [srcInUSD, setSrcInUsd] = useState(0);
  const [srcDstUSD, setDstInUsd] = useState(0);
  const [amountIn, setAmountIn] = useState(ethers.getBigInt(0));
  const [amountOut, setAmountOut] = useState(ethers.getBigInt(0));
  const [slippage, setSlippage] = useState(50);
  const [deadline, setDeadline] = useState(300);
  const [fee, setFee] = useState(ethers.getBigInt(0));
  const [gasFee, setGasFee] = useState(ethers.getBigInt(0));
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (val) => setOpen(val);
  const tokensSum = ethers.getBigInt(0);

  const handleSlippage = (value) => setSlippage(value);
  const handleSetDeadline = (value) => setDeadline(value);

  const SwapCoins = () => {
    const first = selectedToken[0];
    const last = selectedToken[1];
    setSelectedToken([last, first]);
    setAmounts([ethers.getBigInt(0), ethers.getBigInt(0)]);
    setAmountOut(ethers.getBigInt(0));
    setAmountIn(ethers.getBigInt(0));
    setBalances([balances[1], balances[0]]);
    setRates([rates[1], rates[0]]);
  };

  /**
   *
   * @param changing_token token which its amount is changing
   * @param amount amount of changing token
   */
  const convertToTarget = (changing_token, amount) => {
    if (amount == "") {
      return setAmounts(["", ""]);
    }
    setLastChange(changing_token);
    if (changing_token == 0) {
      const amountIn = ethers.parseUnits(amount, selectedToken[0].decimals);
      const amountOut =
        (amountIn * rates[0]) /
        ethers.parseUnits("1", selectedToken[0].decimals);
      setAmounts([
        amount.toString(),
        ethers.formatUnits(amountOut, selectedToken[1].decimals),
      ]);
      setAmountIn(amountIn);
      setAmountOut(amountOut);
    } else {
      const amountIn = ethers.parseUnits(amount, selectedToken[1].decimals);
      const amountOut =
        (amountIn * rates[1]) /
        ethers.parseUnits("1", selectedToken[1].decimals);
      setAmounts([
        ethers.formatUnits(amountOut, selectedToken[0].decimals),
        amount.toString(),
      ]);
      setAmountIn(amountIn);
      setAmountOut(amountOut);
    }
  };

  const handleSelect = (item1, index) => {
    if (!defaultTokens.find((t) => t.address == item1[index].address)) {
      setDefaultTokens([item1[index], ...defaultTokens]);
    }
    setSelectedToken([...item1]);
    setSwaped(false);
  };

  const getButtonDisabled = () => {
    const mode = getButtonText();
    return (
      noLP ||
      loadingRate ||
      (mode == "Swap" && !selectedToken[1].address) ||
      loadingApprove ||
      (mode == "Swap" && amountOut.toString() == "0")
    );
  };

  const getButtonText = () => {
    if (!isConnected) {
      return "Connect";
    } else {
      if (noLP) {
        return "Insufficient Liquidity";
      } else {
        if (loadingApprove || loadingSwap) {
          return (
            <Box
              sx={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}
              color="white"
            >
              <CircularProgress />
            </Box>
          );
        }
        if (getAmountToApprove(amountIn) > ethers.getBigInt(0)) {
          return "Approve";
        }
        return "Swap";
      }
    }
  };

  const getDisabled = () => {
    return !isConnected || loadingRate;
  };

  const checkValid = () => {
    if (
      selectedToken?.[1]?.name == undefined ||
      selectedToken?.[0]?.name == undefined ||
      selectedToken?.[1] == undefined ||
      selectedToken?.[0] == undefined
    ) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  const getPrice = async (
    chain,
    slippage,
    amountIn,
    tokenIn,
    tokenOut,
    userAddress
  ) => {
    setLoadingRate(true);
    try {
      const result = await getQoute(
        chain,
        slippage,
        amountIn,
        tokenIn,
        tokenOut,
        userAddress
      );
      if (result == "NO_LIQUIDITY") {
        setNoLP(true);
      } else {
        setNoLP(false);
        //rest of the code
        const rate_A_to_B = ethers.getBigInt(result.destAmount);
        const rate_B_to_A =
          (ethers.parseUnits("1", selectedToken[0].decimals * 2) *
            ethers.parseUnits("1", selectedToken[1].decimals)) /
          (rate_A_to_B * ethers.parseUnits("1", selectedToken[1].decimals));
        setGasFee(result.gasCostUSD);
        setRates([rate_A_to_B, rate_B_to_A]);
        getAllowance(result.tokenTransferProxy);
        setSpender(result.tokenTransferProxy);
      }
    } catch (e) {
    } finally {
      setLoadingRate(false);
    }
  };

  //Get allowance shortage
  const getAmountToApprove = (amount) => {
    return amount > allowance ? amount - allowance : 0;
  };

  //Get allowance amount for [user][spender]
  const getAllowance = async (spender) => {
    if (isConnected) {
      if (address) {
        try {
          if (selectedToken[0].native) {
            return setAllowance(ethers.MaxUint256);
          } else {
            const tokenContract = new ethers.Contract(
              selectedToken[0].address,
              ERC20ABI,
              provider
            );
            const allowance = await tokenContract.allowance(address, spender);
            setAllowance(ethers.getBigInt(allowance));
          }
        } catch (e) {
          setAllowance(0);
        }
      }
    }
  };

  //Get allowance amount for [user][spender]
  const approve = async () => {
    if (isConnected) {
      if (address) {
        setLoadingApprove(true);
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner(address);
          const tokenContract = new ethers.Contract(
            selectedToken[0].address,
            ERC20ABI,
            signer
          );
          notif.show("Confirm the approve in your wallet!", {
            autoHideDuration: 3000,
            severity: "info",
          });
          const tx = await tokenContract.approve(spender, amountIn);
          notif.show("Transaction sent, waiting for confirmation!", {
            autoHideDuration: 3000,
            severity: "info",
          });
          const recipient = await tx.wait(1);
          notif.show("Approved succesfully!", {
            autoHideDuration: 3000,
            severity: "success",
          });
          await getAllowance(spender);
        } catch (e) {
          notif.show("Approving faild!", {
            autoHideDuration: 3000,
            severity: "error",
          });
          console.log(e);
        } finally {
          setLoadingApprove(false);
        }
      }
    }
  };

  const swap = async () => {
    setLoadingSwap(true);
    try {
      notif.show("Getting best swap path!", {
        autoHideDuration: 1500,
        severity: "info",
      });
      const result = await getQoute(
        chainId,
        slippage,
        amountIn,
        selectedToken[0],
        selectedToken[1],
        address,
        true,
        address
      );
      const params = result.txParams;
      if (params) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(address);
        notif.show("Confirm the swap in your wallet!", {
          autoHideDuration: 5000,
          severity: "info",
        });
        const tx = await signer.sendTransaction(params);
        notif.show("Transaction sent, waiting for confirmation!", {
          autoHideDuration: 5000,
          severity: "info",
        });
        await tx.wait(1);
        notif.show("Swapped succesfully!", {
          autoHideDuration: 3000,
          severity: "success",
        });
        fetchBalances(selectedToken[0], 0);
        fetchBalances(selectedToken[1], 1);
      }
    } catch (e) {
      notif.show("Swapping faild!", {
        autoHideDuration: 3000,
        severity: "error",
      });
      console.log(e);
    } finally {
      setLoadingSwap(false);
    }
  };

  //Fetch balance of token 1 and token 2
  const fetchBalances = async (token, index) => {
    if (isConnected) {
      if (address) {
        if (token?.address) {
          let newBalances = [...balances];
          let balance;
          try {
            if (token.native) {
              balance = await provider.getBalance(address);
            } else {
              const tokenContract = new ethers.Contract(
                token.address,
                ERC20ABI,
                provider
              );
              balance = await tokenContract.balanceOf(address);
            }
            newBalances[index] = balance;
          } catch (e) {
            newBalances[index] = ethers.getBigInt(0);
          }
          setBalances([...newBalances]);
        }
      }
    }
  };

  const getExplorerLogoForChain = (chainid) => {
    return {
      1: "etherscan.svg",
      10: "opscan.svg",
      56: "bscscan.svg",
      137: "polygonscan.svg",
      42161: "arbitrum.svg",
      43114: "avalanche.svg",
    }[chainid];
  };

  function isValidNumber(input) {
    // Convert the input to a string and trim whitespace
    const str = input.toString().trim();

    // Regular expression to validate numbers
    const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

    return regex.test(str);
  }

  //||||||||||||||||||| Use Effects ||||||||||||||||||||||

  //@dev If one of tokens changed, update balances
  useEffect(() => {
    //if both tokens exists
    fetchBalances(selectedToken[0], 0);
    fetchBalances(selectedToken[1], 1);
    checkValid();
    if (!swaped) {
      if (selectedToken?.[1]) {
        //and both have valid addresses
        if (selectedToken?.[1]?.address && selectedToken?.[0]?.address) {
          //calculate best possible pool
          getPrice(
            chainId ? chainId : 1,
            slippage,
            ethers.parseUnits("1", selectedToken[0].decimals),
            selectedToken[0],
            selectedToken[1],
            address
          );
        }
      }
    }
  }, [selectedToken?.[0], selectedToken?.[1]]);

  //@dev If account or connection status changed (disconnected/connected) update balancesj
  useEffect(() => {
    if (isConnected) {
      if (address) {
        fetchBalances(selectedToken[0], 0);
        fetchBalances(selectedToken[1], 1);
      }
    }
  }, [address, isConnected]);

  //@dev If chain changed update available tokens
  useEffect(() => {
    if (chainId) {
      if (Tokens[chainId]) {
        setDefaultTokens(Tokens[chainId]);
        setSelectedToken([Tokens[chainId][0], {}]);
        setProvider(new ethers.JsonRpcProvider(Providers[chainId]));
      } else {
        notif.show("This chain is not supported!", {
          autoHideDuration: 3000,
          severity: "error",
        });
      }
    }
  }, [chainId]);

  //@dev Upon loading, check if a wallet already exists, if not, notify user to install one
  useEffect(() => {
    if (!window.ethereum) {
      notif.show("Please install a wallet", {
        autoHideDuration: 3000,
        severity: "warning",
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main className=" flex flex-col items-center py-24">
        <Modal
          provider={provider}
          Tokens={defaultTokens}
          open={open}
          handleOpen={handleOpen}
          selectedToken={selectedToken}
          // setSelectedToken={setSelectedToken}
          handleSelect={handleSelect}
        />
        <div className="w-[80%] md:w-[60%] lg:w-[60%] flex justify-center items-center mb-4">
          <h2 className=" text-white text-xl md:text-5xl text-center lg:text-6xl">
            Multi-Chain Swap Demo
          </h2>
        </div>
        <div className="flex m-1 justify-end px-1 w-[90%] md:w-[60%] lg:w-[40%]">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <Gear fill={"white"} size={30} />
          </span>
          <Popup {...{ isOpen, setIsOpen }}>
            <Accordion
              name={`Max. slippage`}
              name2={`${popUpValues.slippage || "auto"}`}
            >
              <div className="flex justify-between">
                <div className="px-1 border border-gray-700 flex justify-between rounded-full mx-1 my-2 w-[60%] md:w-[40%]">
                  <button
                    onClick={() => {
                      setSlippage(50);
                      setPopUpValues({ ...popUpValues, choosetype: "Auto" });
                    }}
                    className={`text-lg text-white p-1 my-1 ${popUpValues.choosetype == "Auto" ? "bg-blue-500" : ""} rounded-full`}
                  >
                    Auto
                  </button>
                  <button
                    onClick={() =>
                      setPopUpValues({ ...popUpValues, choosetype: "Custom" })
                    }
                    className={`text-lg text-white p-1 my-1 ${popUpValues.choosetype == "Custom" ? "bg-blue-500" : ""} rounded-full`}
                  >
                    Custom
                  </button>
                </div>
                <div className="px-1 text-white items-center border border-gray-700 overflow-hidden flex justify-between rounded-2xl mx-1 my-2 w-[40%] md:w-[60%]">
                  <input
                    className={`text-lg w-[80%] text-right bg-black outline-none`}
                    disabled={popUpValues.choosetype == "Custom" ? false : true}
                    onChange={(e) => {
                      if (isValidNumber(e.target.value)) {
                        if (parseFloat(e.target.value) > 49)
                          e.target.value = 49;
                        setSlippage(
                          Math.min(parseFloat(e.target.value) * 100, 4900)
                        );
                      }
                    }}
                    type="text"
                    placeholder="0.5"
                  />
                  <span>%</span>
                </div>
              </div>
            </Accordion>
            <Accordion
              name={`Transaction deadline`}
              name2={`${popUpValues.minutes || "1"}m`}
            >
              <div className="">
                <div className="px-1 text-white items-center border border-gray-700 overflow-hidden flex justify-between rounded-3xl pe-2 mx-3 my-2">
                  <input
                    className="text-lg w-[75%] bg-black h-10 px-1 outline-none text-right"
                    onChange={(e) => {
                      if (isValidNumber(e.target.value)) {
                        setDeadline(
                          Math.floor(Date.now() / 1000) +
                            parseInt(e.target.value) * 60
                        );
                      }
                    }}
                    type="text"
                    placeholder="1"
                  />
                  <span>minutes</span>
                </div>
              </div>
            </Accordion>
            <hr className="border-gray-800 " />
            <div className="flex items-center justify-between">
              <div className="mt-4 p-2">
                <div className="text-white text-lg">Default trade options</div>
                <span className="text-white text-sm">
                  The client selects the cheapest trade option factoring price
                  and network costs.
                </span>
              </div>
              <div className="w-[40%]">
                <ToggleSwitch {...{ popUpValues, setPopUpValues }} />
              </div>
            </div>
          </Popup>
        </div>
        <div className=" bg-black rounded-lg p-1 h-[20rem] w-[90%] md:w-[60%] lg:w-[40%]">
          <div className="bg-gray-800 flex items-center w-full h-[49.5%] rounded-lg">
            <div className="w-full">
              <div className="px-4">
                <span className="text-white">Sell</span>
              </div>
              <div className="flex justify-between py-3 px-5">
                <input
                  placeholder="0"
                  value={amounts[0]}
                  onChange={(e) => {
                    convertToTarget(0, e.target.value);
                  }}
                  style={{
                    opacity: getDisabled() ? "0.7" : "1",
                    pointerEvents: getDisabled() ? "none" : "all",
                  }}
                  disabled={validity}
                  className="h-10 border-gray-600 border-0 outline-none text-white px-2 w-[40%] md:w-[65%] rounded bg-gray-800"
                />
                {selectedToken[0]?.name ? (
                  <button
                    style={{
                      opacity: getDisabled() ? "0.7" : "1",
                      pointerEvents: getDisabled() ? "none" : "all",
                    }}
                    onClick={() => handleOpen(1)}
                    className="flex items-center justify-between w-28 text-white bg-black px-2 rounded-full"
                  >
                    <Logo token={selectedToken[0]}></Logo>
                    <span>{selectedToken[0].symbol}</span>
                    <ChevronDown fill={"white"} size={20} />
                  </button>
                ) : (
                  <button
                    style={{
                      opacity: getDisabled() ? "0.7" : "1",
                      pointerEvents: getDisabled() ? "none" : "all",
                    }}
                    onClick={() => handleOpen(1)}
                    className="flex justify-between items-center btn bg-blue-600 rounded-full p-2 text-white"
                  >
                    <span className="px-2 text-sm">select Token</span>
                    <ChevronDown fill={"white"} size={20} />
                  </button>
                )}
              </div>
              <span
                className="ps-7 text-xs text-gray-500"
                onClick={() =>
                  setAmounts([
                    ethers.formatUnits(
                      balances[0] || "0",
                      selectedToken[0].decimals
                    ),
                    amounts[1],
                  ])
                }
              >
                {selectedToken[0].address
                  ? selectedToken[0].symbol +
                    " Balance: " +
                    ethers.formatUnits(
                      balances[0] || "0",
                      selectedToken[0].decimals
                    )
                  : ""}
              </span>
            </div>
          </div>
          <div className="relative">
            <div
              onClick={SwapCoins}
              className="cursor-pointer hover:bg-gray-700 absolute -top-3 left-[45%] border-2 p-2 border-black rounded bg-gray-800 text-white"
            >
              <ArrowDown fill={"white"} size={20} />
            </div>
          </div>
          <div className="flex items-center bg-gray-800 h-[49.5%] rounded-lg mt-1">
            <div className="w-full">
              <div className="px-4">
                <span className="text-white">Buy</span>
              </div>
              <div className="flex justify-between py-3 px-5">
                <input
                  style={{
                    opacity: getDisabled() ? "0.7" : "1",
                    pointerEvents: getDisabled() ? "none" : "all",
                  }}
                  placeholder="0"
                  value={amounts[1]}
                  disabled={validity}
                  onChange={(e) => convertToTarget(1, e.target.value)}
                  className="h-10 border-gray-600 border-0 outline-none text-white px-2 w-[40%] md:w-[65%] rounded bg-gray-800"
                />
                {selectedToken[1]?.name ? (
                  <button
                    style={{
                      opacity: getDisabled() ? "0.7" : "1",
                      pointerEvents: getDisabled() ? "none" : "all",
                    }}
                    onClick={() => handleOpen(2)}
                    className="flex items-center justify-between w-28 text-white bg-black px-2 rounded-full"
                  >
                    <Logo token={selectedToken[1]}></Logo>
                    <span>{selectedToken[1].symbol}</span>
                    <ChevronDown fill={"white"} size={20} />
                  </button>
                ) : (
                  <button
                    style={{
                      opacity: getDisabled() ? "0.7" : "1",
                      pointerEvents: getDisabled() ? "none" : "all",
                    }}
                    onClick={() => handleOpen(2)}
                    className="flex justify-between items-center btn bg-blue-600 rounded-full p-2 text-white"
                  >
                    <span className="px-2 text-sm">select Token</span>
                    <ChevronDown fill={"white"} size={20} />
                  </button>
                )}
              </div>
              <span
                className="ps-7 text-xs text-gray-500"
                onClick={() =>
                  setAmounts([
                    amounts[0],
                    ethers.formatUnits(
                      balances[1] || "0",
                      selectedToken[1].decimals
                    ),
                  ])
                }
              >
                {selectedToken[1].address
                  ? selectedToken[1].symbol +
                    " Balance: " +
                    ethers.formatUnits(
                      balances[1] || "0",
                      selectedToken[1].decimals
                    )
                  : ""}
              </span>
            </div>
          </div>
          <Accordion name={"Details"}>
            <div className="md:flex justify-between items-start bg-black h-fit text-white p-5">
              <div className="flex flex-col items-start w-1/2 text-gray-300">
                <span className="text-xs">
                  <FiberManualRecordIcon
                    sx={{ width: 10 }}
                    color="primary"
                  ></FiberManualRecordIcon>
                  <b className="ml-1">Slippage:</b>{" "}
                  <span className="text-gray-400">{slippage / 100}%</span>
                </span>
                <span className="text-xs">
                  <FiberManualRecordIcon
                    sx={{ width: 10 }}
                    color="primary"
                  ></FiberManualRecordIcon>
                  <b className="ml-1">Gas Cost:</b>{" "}
                  <span className="text-gray-400">{gasFee.toString()}$</span>
                </span>
              </div>
              <div className="flex flex-col items-start w-1/2 text-gray-300">
                <span className="flex gap-1 items-center text-xs">
                  <FiberManualRecordIcon
                    sx={{ width: 10 }}
                    color="primary"
                  ></FiberManualRecordIcon>
                  <b>Sell:</b>{" "}
                  <span className="text-gray-400">
                    {fixedPoint(amounts[0].toString(), 8)}{" "}
                    {selectedToken[0]?.symbol}
                  </span>
                  <Logo token={selectedToken[0]} size={15}></Logo>
                </span>
                <span className="flex gap-1 items-center text-xs">
                  <FiberManualRecordIcon
                    sx={{ width: 10 }}
                    color="primary"
                  ></FiberManualRecordIcon>
                  <b>Buy:</b>{" "}
                  <span className="text-gray-400">
                    {fixedPoint(amounts[1].toString(), 8)}{" "}
                    {selectedToken[1]?.symbol}
                  </span>
                  <Logo token={selectedToken[1]} size={15}></Logo>
                </span>
              </div>
            </div>
          </Accordion>
          {loadingRate && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}

          <div>
            <button
              style={{
                opacity: getButtonDisabled() ? "0.6" : "1",
                pointerEvents: getButtonDisabled() ? "none" : "all",
              }}
              onClick={() => {
                if (getButtonText() == "Connect") {
                  openModal({ view: "Connect" });
                } else if (getButtonText() == "Approve") {
                  approve();
                } else if (getButtonText() == "Swap") {
                  swap();
                }
              }}
              className={`hover:bg-blue-500 bg-blue-600 text-white rounded-lg p-5 w-full mt-1 flex justify-center`}
            >
              {getButtonText()}
            </button>
          </div>

          <div className="flex justify-between items-start bg-black opacity-70 h-fit rounded-lg mt-3 text-white p-5">
            <div className="flex flex-col items-start w-[40%] gap-1">
              <span className="font-bold mb-2 text-gray-300">Links</span>
              <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <img src="Telegram.svg" width={20}></img>Telegram
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <img src="XIcon.svg" width={20}></img>Twitter
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <img src="web.png" width={20}></img>Website
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <img
                  src={getExplorerLogoForChain(chainId ? chainId : 1)}
                  width={20}
                ></img>
                Token
              </span>
            </div>
            <div className="flex flex-col items-start w-[60%]">
              <span className="font-bold mb-2 text-gray-300">About us...</span>
              <span>
                Easily swap tokens on <b className="text-[#627EEA]">Etheruem</b>
                , <b className="text-[#12aaff]">Arbitrum</b>,{" "}
                <b className="text-[#ff0420]">Optimism</b>,{" "}
                <b className="text-[#7342dc]">Polygon</b>,{" "}
                <b className="text-[#0d54ff]">Base</b> and{" "}
                <b className="text-[#e74041]">Avalanche</b> network.
              </span>
              <span className="text-xs text-blue-600 mt-4 font-bold hover:text-blue-400 hover:cursor-pointer">
                Want to customize this swap for your project? click here
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
