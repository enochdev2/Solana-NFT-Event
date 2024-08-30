"use client";

import React, { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { web3 } from "@coral-xyz/anchor";
import { handleCreateEvent } from "../../src/handlers/HandleCreateEvent";
import Layout from "../../src/components/Layout";
import Image from "next/image";

const CreateEvent: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>(""); // État pour l'heure
    const [location, setLocation] = useState<string>("");
    const [ticketPrice, setTicketPrice] = useState<string>("");

    const [ticketPriceInSOL, setTicketPriceInSOL] = useState<string>("");
    const wallet = useAnchorWallet();

    useEffect(() => {
        const priceInLamports = parseFloat(ticketPrice);
        if (!isNaN(priceInLamports)) {
            setTicketPriceInSOL((priceInLamports / web3.LAMPORTS_PER_SOL).toFixed(9));
        } else {
            setTicketPriceInSOL("");
        }
    }, [ticketPrice]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setLocation("");
        setTicketPrice("");
        setTicketPriceInSOL("");
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row items-start justify-between px-8 text-white">
      {/* Left Side: Text and Button */}
      <div className=" relative  md:w-1/2 p-4 h-[100vh] ">
        <Image
          src='/nft.png'
          fill

          alt="NFT Event"
          className="w-full  rounded-lg shadow-md"
        />
      </div>

      {/* Right Side: Image */}
      <div className="max-w-md mx-auto p-4 mt-5  shadow-md rounded-lg flex-1 bg-gradient-to-r from-[#eb0ebf] via-[#e21c1c] to-[#9206f7] backdrop-blur-lg">
      <div className="max-w-md mx-auto p-4 my-5 bg-black/70 text-white shadow-md rounded-lg flex-1">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      
      <form
                        className="space-y-2"
                        onSubmit={(e) => handleCreateEvent(e, title, description, date, time, location, ticketPrice, wallet, resetForm)}
                    >
        <div>
          <label className="block text-sm font-medium text-gray-100" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 border bg-black/80 border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-100" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 border bg-black/80 border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-100" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 p-2 border bg-black/80 border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
            <input
                  id="time"
                  name="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-black/80 placeholder-gray-500 text-gray-100 sm:text-sm"
                    placeholder="time"
              />
          </div>
        <div>
          <label className="block text-sm font-medium text-gray-100" htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 p-2 border bg-black/80 border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-100" htmlFor="ticketPrice">Ticket Price (in SOL)</label>
          <input
            type="number"
            id="ticketPrice"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 bg-black rounded-md w-full"
          />
        </div>
        <button
          type="submit"
        //   onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
      </div>
    </div>
        </Layout>
    );
};

export default CreateEvent;
