"use client";

import React from "react";
import Layout from "../src/components/Layout";
import Hero from "@/src/components/Hero";
import Link from "next/link";

const Home: React.FC = () => {
    return (
        <Layout>
            <section className=" bg-[url('/herobg.png')]">
            <Hero/>
            <div className="flex flex-col py-8 items-center justify-center ">
                <h1 className="text-5xl font-extrabold bg-gradient-to-br from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] text-transparent bg-clip-text mb-4">Welcome to our events and NFTs platform.</h1>
                <p className="text-xl text-gray-100 mb-8 text-center max-w-2xl">
                Our platform, built on the Solana blockchain, allows event organizers to create unique events and sell tickets as NFTs.
                Using the Solana blockchain, our platform enables event organizers to mint unique events and sell tickets as non-fungible tokens.
                </p>

                <div className="flex flex-wrap justify-center gap-8">
                <div className="bg-gradient-to-r from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] rounded-lg shadow-lg p-6 max-w-xs">
                        <h3 className="text-xl font-bold text-indigo-100 mb-2">Create an Event</h3>
                        <p className="text-gray-100 mb-4  bg-black/20  w-full rounded-md">Organize your events in just a few clicks and make them available to your audience. Set up your events in seconds and share them with your community.</p>
                        <Link
                            href="/create-event"
                            className="block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Create an Event
                        </Link>
                    </div>
                    <div className="bg-gradient-to-r from-[#ffafaf] via-[#0489f5a6] to-[#c374f7]  rounded-lg flex-col flex justify-between shadow-lg p-6 max-w-xs">
                        <h3 className="text-xl font-bold text-indigo-100 mb-2">List of Events</h3>
                        <p className="text-gray-100 mb-4 bg-black/20  w-full rounded-md">Explore all available events and join the ones you&apos;re interested in.
                        </p>
                        <Link
                            href="/list-events"
                            className="block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                           View Events
                        </Link>
                    </div>
                    <div className="bg-gradient-to-r from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] flex-col flex justify-between rounded-lg shadow-lg p-6 max-w-xs">
                        <h3 className="text-xl font-bold text-indigo-100 mb-2">Verify an NFT</h3>
                        <p className="text-gray-100 mb-4 w-full bg-black/20">Ensure the authenticity of the NFTs associated with your event tickets.</p>
                        <Link
                            href="/verify-nft"
                            className="block text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Verify an NFT
                        </Link>
                    </div>
                </div>

                {/* <div className="mt-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How does it work?</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
                            <h4 className="text-xl font-bold text-indigo-600 mb-2">1. Create your event</h4>
                            <p className="text-gray-600">Describe your event, set the ticket price, and publish it on our platform.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
                            <h4 className="text-xl font-bold text-indigo-600 mb-2">2. Sell tickets in the form of NFTs</h4>
                            <p className="text-gray-600">Participants purchase tickets that are issued as unique and verifiable NFTs.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs">
                            <h4 className="text-xl font-bold text-indigo-600 mb-2">3. Verify the authenticity of the tickets.</h4>
                            <p className="text-gray-600">
                            Use our verification tool to ensure the authenticity of tickets upon entry to the event.
                            </p>
                        </div>
                    </div>
                </div> */}

                <div className="mt-12 text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-br from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] text-transparent bg-clip-text mb-4">Join us now!</h2>
                    <p className="text-lg text-[#c7bdf5] mb-8 max-w-2xl">
                    Whether you&apos;re an event organizer or an attendee, our platform offers you a unique and secure experience.
                    </p>
                    <Link href="/create-event" className="inline-block py-3 px-6 bg-gradient-to-br from-[#ffafaf] via-[#0489f5a6] to-[#c374f7] text-2xl text-white rounded-lg hover:bg-indigo-700 transition font-bold duration-300">
                    Start
                    </Link>
                </div>
            </div>
            </section>
        </Layout>
    );
};

export default Home;
