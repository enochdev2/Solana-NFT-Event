"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAnchorProgram } from "../../src/utils/anchorUtils";
import { handleCopyToClipboard } from "../../src/utils/various";
import { PublicKey } from "@solana/web3.js";
import idl from "../../src/idl/nft_ticketing.json";
import Layout from "../../src/components/Layout";

const ListEvents: React.FC = () => { 
    const [events, setEvents] = useState<any[]>([]);
    const wallet = useAnchorWallet();

    useEffect(() => {
        const fetchEvents = async () => { 
            if (!wallet?.publicKey) {
                return;
            }

            // Récupère le programme Anchor et le Provider.
            const { connection, program } = getAnchorProgram(wallet);

            try {
                // Récupère les comptes du programme.
                const accounts : any = await connection.getProgramAccounts(new PublicKey(idl.address));

                // Récupère les données de chaque compte événement.
                const eventAccounts = await Promise.all(
                    accounts.map(async ({ pubkey , account } : any) => {
                        try {
                            // @ts-ignore
                            const fetchedAccountData = await program.account.event.fetch(pubkey);

                            return {
                                publicKey: pubkey,
                                accountData: fetchedAccountData,
                            };
                        } catch (e) {
                            return null;
                        }
                    }),
                );

                // Filtre les comptes valides et met à jour l'état.
                setEvents(eventAccounts.filter((account) => account !== null));
            } catch (err) {
                console.error("Failed to fetch events.", err);
            }
        };

        fetchEvents();
    }, [wallet]);

    return (
        <Layout>
            <div className="container mx-auto px-4 lg:px-12 min-h-screen py-8 bg-[url('/herobg.png')]">
            <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-[#f305cb] via-[#ff0000] to-[#8c06fa] text-transparent bg-clip-text">NFT Event Listings</h1>
            <p className="text-pink-300 mb-10 w-2/3 my-5 text-center text-2xl m-auto mt-4">
                Discover all events created on the Solana blockchain. Click on an event to learn more and securely purchase tickets. Explore a world of events built on Solana. Click to learn more and buy tickets safely.


                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                        <div key={index} className="  rounded-lg overflow-hidden shadow-xl">
                        <div className="p-4 bg-gradient-to-tl from-[#050391] via-[#023d8af8] to-[#2c1864] backdrop- backdrop-opacity-20">
                            <h2 className="text-xl font-semibold">
                                <b>Title</b> : {event.accountData.title}
                            </h2>
                            <p className="text-gray-600">
                                <b>Description</b> : {event.accountData.description}
                            </p>
                            <p className="mb-2">
                                <b>Date of listing</b> : {new Date(event.accountData.date.toNumber() * 1000).toLocaleString()}
                            </p>
                            <p className="mb-2">
                                <b> Place </b> : {event.accountData.location}
                            </p>
                            <p className="mb-2">
                                <b>Ticket Price</b> : {(event.accountData.ticketPrice.toNumber() / 1_000_000_000).toFixed(9)} SOL
                            </p>
                            <p className="mb-2 flex items-center justify-center">
                                <b>Organizer&apos;s public key</b> :{" "}
                                <span
                                    className="truncate bg-black/50 p-1 rounded cursor-pointer ml-2"
                                    onClick={() => handleCopyToClipboard(event.accountData.organizer.toBase58())}
                                >
                                    {event.accountData.organizer.toBase58()}
                                </span>
                            </p>
                            <p className="mb-2 flex items-center justify-center">
                                <b> Public key of the event </b> :{" "}
                                <span
                                    className="truncate bg-black/50 p-1 rounded cursor-pointer ml-2"
                                    onClick={() => handleCopyToClipboard(event.publicKey.toBase58())}
                                >
                                    {event.publicKey.toBase58()}
                                </span>
                            </p>
                            <p>
                                <Link
                                    href={`/show-event/${event.publicKey.toBase58()}`}
                                    className="group relative inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mt-4"
                                >
                                   Join the event
                                </Link>
                            </p>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ListEvents;
