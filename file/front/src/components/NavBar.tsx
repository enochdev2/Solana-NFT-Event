"use client";
import React, { useState } from "react";
// import WalletMultiButton from "./wallet-multi-button";
import Image from "next/image";
import SolanaLogo from "../../public/solanaLogo.svg";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex justify-around bg-[#050816] w-screen overflow-x-hidden items-center border border-black m-auto  p-5">
            <div className="hidden md:block">
                <Image src={SolanaLogo} alt="Solana Logo" width={200} height={200} />
            </div>
            <div className="text-white hidden md:flex text-sm md:text-xl space-x-3 md:space-x-6">
                <Link href={"/"}>Home</Link>
                <Link href={"/create-event"}>Create Event</Link>
                <Link href={"/verify-nft"}>Verify NFT</Link>
            </div>
            <WalletMultiButton />
        </div>
    );
};

export default NavBar;

// export function NavBar() {
//   return (
//     <div className="flex justify-around bg-[#050816] items-center border border-black m-auto  p-5">
//       <div className="hidden md:block">
//       <Image src={SolanaLogo} alt="Solana Logo" width={200} height={200} />
//       </div>
//       <div className="text-white space-x-6">
//         <Link href={"/"} >
//          Home
//         </Link>
//         <Link href={"/create-event"} >
//          Create Event
//         </Link>
//         <Link href={"/verify-nft"} >
//          Verify NFT
//         </Link>
//       </div>
//       <WalletMultiButton />
//     </div>
//   );
// }
