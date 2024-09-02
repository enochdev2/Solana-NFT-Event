import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";
import { getAnchorProgram } from "../utils/anchorUtils";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

export const handleVerifyNft = async (e: React.FormEvent, nftPublicKey: string, eventPublicKey: string, wallet: ReturnType<typeof useAnchorWallet>) => {
    e.preventDefault();

    if (!wallet?.publicKey) {
        toast.error("Please connect your wallet!");
        return;
    }

    try {
        const { program } = getAnchorProgram(wallet);

        const eventAccount = await program.account.event.fetch(new PublicKey(eventPublicKey));
        if (!eventAccount) {
            toast.error("Event not found..");
            return;
        }

        const tickets = await program.account.ticket.all([
            {
                memcmp: {
                    offset: 8,
                    bytes: eventPublicKey,
                },
            },
        ]);
        const ticket = tickets.find((t) => {
            const nftMint = t.account.nftMint as PublicKey | undefined;
            return nftMint && nftMint.equals(new PublicKey(nftPublicKey));
        });
        if (!ticket) {
            toast.error("No ticket associated with this event for this NFT.");
            return;
        }

        toast.success("NFT Successfully Verified!");
    } catch (err) {
        toast.error("Failed to verify NFT.");
        console.error("Failed to verify NFT.", err);
    }
};
