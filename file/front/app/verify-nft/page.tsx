"use client";

import React, { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Layout from "../../src/components/Layout";
import { handleVerifyNft } from "../../src/handlers/HandleVerifyNft";

const VerifyNft: React.FC = () => {
    const [eventPublicKey, setEventPublicKey] = useState<string>("");
    const [nftPublicKey, setNftPublicKey] = useState<string>("");
    const wallet = useAnchorWallet();

    return (
        <Layout>
            <section className="w-full h-screen flex justify-center items-center mx-auto">
                <div className="w-[98%] h-screen flex items-center justify-center">
                    <div className="max-w-md w-full space-y-8 p-10 shadow-sm bg-gradient-to-tl from-[#092338] to-[#2b0416] rounded-xl shadow-purple-600 ">
                        <h1 className="text-center text-3xl font-extrabold bg-gradient-to-br from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] text-transparent bg-clip-text ">
                            {" "}
                            Verify your NFT
                        </h1>
                        <p className="text-blue-300 mb-4 text-xl">For X events, verify the authenticity of X NFT.</p>
                        <form className="space-y-6" onSubmit={(e) => handleVerifyNft(e, nftPublicKey, eventPublicKey, wallet)}>
                            <div className="rounded-md shadow-sm space-y-5">
                                <div>
                                    <input
                                        id="eventPublicKey"
                                        name="eventPublicKey"
                                        type="text"
                                        value={eventPublicKey}
                                        onChange={(e) => setEventPublicKey(e.target.value)}
                                        required
                                        className="relative block w-full px-4 py-3 border rounded-md border-gray-600 placeholder-gray-500 text-1ray-900 rounded-t-md sm:text-sm bg-transparent"
                                        placeholder="Public key of the event."
                                    />
                                </div>

                                <div>
                                    <input
                                        id="nftPublicKey"
                                        name="nftPublicKey"
                                        type="text"
                                        value={nftPublicKey}
                                        onChange={(e) => setNftPublicKey(e.target.value)}
                                        required
                                        className="relative block w-full px-4 py-3 border rounded-md border-gray-700 placeholder-gray-500 bg-transparent text-gray-200 rounded-b-md sm:text-sm"
                                        placeholder="NFT Public Key"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-br from-[#f51111] via-[#0489f5a6] to-[#9707f7] hover:bg-indigo-700"
                                >
                                    Verify the NFT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default VerifyNft;
