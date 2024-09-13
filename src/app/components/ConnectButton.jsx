"use client";
import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";


export default function CustomButton({ className }) {
    const { open, close } = useWeb3Modal();
    const {disconnect} = useDisconnect()
    const { isConnected } = useWeb3ModalAccount();
    
    if (isConnected)
        return (
            <button
                onClick={() => disconnect()}
                className={`${className}`}
            >
                {/* <span className="mr-2 text-xl">🔓</span> */}
                Disconnect
            </button>
        );
    return (
        <button
            onClick={() => open()}
            className={`${className}`}
        >
            {/* <span className="mr-2 text-xl">👛</span> */}
            Connect Wallet
        </button>
    );
}
