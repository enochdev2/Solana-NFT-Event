"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAnchorProgram } from "../../../src/utils/anchorUtils";
import { handleCopyToClipboard } from "../../../src/utils/various";
import { handleBuyTicket } from "../../../src/handlers/HandleBuyTicket";
import { handleCreateNft } from "../../../src/handlers/HandleCreateNft";
import { PublicKey } from "@solana/web3.js";
import Layout from "../../../src/components/Layout";
import QRCode from "qrcode.react";

const ShowEvent: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const eventPublicKey = pathname.split("/").pop(); // Récupère la clé publique de l'URL

    const [eventDetails, setEventDetails] = useState<any>(null);
    const [tickets, setTickets] = useState<any[]>([]);
    const wallet = useAnchorWallet();

    const qrCodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (!wallet?.publicKey || !eventPublicKey) {
                return;
            }

            const { program } = getAnchorProgram(wallet);

            try {
                const event = await program.account.event.fetch(new PublicKey(eventPublicKey));
                setEventDetails(event);

                // Récupère les tickets associés à l'événement.
                const accounts = await program.account.ticket.all([
                    {
                        memcmp: {
                            offset: 8, // Taille de l'en-tête de l'account.
                            bytes: eventPublicKey,
                        },
                    },
                ]);
                setTickets(accounts.map(({ publicKey, account }) => ({ publicKey, account })));
            } catch (err) {
                router.push("/");
            }
        };

        fetchEventDetails();
    }, [wallet, eventPublicKey]);

    const handleDownloadQrCode = (nftMint: string) => {
        const qrCodeCanvas = qrCodeRefs.current[nftMint]?.querySelector("canvas");
        if (qrCodeCanvas) {
            const link = document.createElement("a");
            link.href = qrCodeCanvas.toDataURL("image/png");
            link.download = `qrcode-${nftMint}.png`;
            link.click();
        }
    };

    return (
        <Layout>
            <div className=" w-screen px-3 min-h-screen mb-10">
                <div className="lg:flex items-center h-full gap-4  justify-evenly">
                    <div className="max-w-md w-full space-y-8 p-10 mt-3 bg-gradient-to-tl from-[#092338] to-[#2b0416] rounded-xl shadow-md">
                        {eventDetails && (
                            <div className="mb-6">
                                <h1 className="text-center text-4xl font-extrabold bg-gradient-to-br from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] text-transparent bg-clip-text mb-3">
                                    {eventDetails.title}
                                </h1>
                                <p className="text-center text-purple-300 mb-2">
                                    <b>Description</b> : {eventDetails.description}
                                </p>
                                <p className="text-center text-purple-300 mb-2">
                                    <b>Date and Time</b> : {new Date(eventDetails.date.toNumber() * 1000).toLocaleString()}
                                </p>
                                <p className="text-center text-purple-300 mb-2">
                                    <b>Location</b> : {eventDetails.location}
                                </p>
                                <p className="text-center text-purple-300 mb-2">
                                    <b>Ticket Price</b> : {(eventDetails.ticketPrice.toNumber() / 1_000_000_000).toFixed(9)} SOL
                                </p>
                                <p className="text-center text-gray-100 mb-2">
                                    <span className="font-bold text-purple-300">Organizer&apos;s Public Key</span> :
                                    <span
                                        className="block truncate bg-black/70 p-1 rounded cursor-pointer"
                                        title={eventDetails.organizer.toBase58()}
                                        onClick={() => handleCopyToClipboard(eventDetails.organizer.toBase58())}
                                    >
                                        {eventDetails.organizer.toBase58()}
                                    </span>
                                </p>
                                <p className="text-center text-gray-100">
                                    <span className="font-bold text-purple-300">Event&apos;s Public Key</span> :
                                    <span
                                        className="block truncate bg-black/70 p-1 rounded cursor-pointer"
                                        title={eventPublicKey as string}
                                        onClick={() => handleCopyToClipboard(eventPublicKey as string)}
                                    >
                                        {eventPublicKey}
                                    </span>
                                </p>
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={(e) => handleBuyTicket(e, eventPublicKey!, eventDetails, wallet, setTickets)}>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-br from-[#f51111] via-[#0489f5a6] to-[#9707f7] hover:bg-indigo-700"
                                >
                                    Buy a Tickett
                                </button>
                            </div>
                        </form>
                    </div>
                    {tickets.length > 0 && (
                        <div className="mt-8 py-6 bg-gradient-to-tl from-[#092338] to-[#2b0416] rounded-lg">
                            <h3 className="text-center text-2xl font-extrabold bg-gradient-to-br from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] text-transparent bg-clip-text">
                                Tickets purchased for this event :
                            </h3>
                            <ul>
                                {tickets.map((ticket, index) => (
                                    <li key={index} className="mt-4 p-4 text-purple-500 rounded-md shadow-sm">
                                        <p className="mb-2">
                                            <b>Price paid</b> : {(ticket.account.price.toNumber() / 1_000_000_000).toFixed(9)} SOL
                                        </p>
                                        <p className="mb-2">
                                            <b>Date and time of purchase</b> : {new Date(ticket.account.dateOfPurchase.toNumber() * 1000).toLocaleString()}
                                        </p>
                                        <p className="mb-2 flex items-center justify-center">
                                            <b>Buyer&apos;s public key</b> :{" "}
                                            <span
                                                className="truncate bg-black/70 p-1 rounded cursor-pointer"
                                                onClick={() => handleCopyToClipboard(ticket.account.owner.toBase58())}
                                            >
                                                {ticket.account.owner.toBase58()}
                                            </span>
                                        </p>
                                        <p className="mb-5 flex items-center justify-center">
                                            <b>Ticket public key</b> :{" "}
                                            <span
                                                className="truncate bg-black/70 p-1 rounded cursor-pointer ml-2"
                                                onClick={() => handleCopyToClipboard(ticket.publicKey.toBase58())}
                                            >
                                                {ticket.publicKey.toBase58()}
                                            </span>
                                        </p>
                                        {ticket.account.nftMint ? (
                                            <div className="border border-purple-600 p-2 rounded-md text-center">
                                                <p>
                                                    <b>NFT public key</b> :
                                                </p>
                                                <p className="mt-2 flex items-center justify-center">
                                                    <span
                                                        className="truncate bg-sky-800/30 p-1 rounded cursor-pointer"
                                                        onClick={() => handleCopyToClipboard(ticket.account.nftMint.toBase58())}
                                                    >
                                                        {ticket.account.nftMint.toBase58()}
                                                    </span>
                                                </p>
                                                <div
                                                    ref={(el) => {
                                                        qrCodeRefs.current[ticket.account.nftMint.toBase58()] = el;
                                                    }}
                                                    onClick={() => handleDownloadQrCode(ticket.account.nftMint.toBase58())}
                                                    className="cursor-pointer mx-auto mt-2 flex justify-center"
                                                    title="Download the QR code"
                                                >
                                                    <QRCode
                                                        value={ticket.account.nftMint.toBase58()}
                                                        size={80}
                                                        data-nft-mint={ticket.account.nftMint.toBase58()}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            ticket.account.owner.equals(wallet?.publicKey) && (
                                                <button
                                                    onClick={() => handleCreateNft(ticket.publicKey, wallet, eventPublicKey!, setTickets)}
                                                    className="group relative inline-flex justify-center mt-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-br from-[#f51111] via-[#0489f5a6] to-[#9707f7]"
                                                >
                                                    Generate my NFT
                                                </button>
                                            )
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ShowEvent;
