import { web3, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { toast } from "react-toastify";
import { getAnchorProgram, getNetworkUrl } from "../utils/anchorUtils";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
// Imports ajoutés pour le NFT :
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { findMasterEditionPda, findMetadataPda, mplTokenMetadata, MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

export const handleCreateNft = async (
    ticketPublicKey: PublicKey,
    wallet: ReturnType<typeof useAnchorWallet>,
    eventPublicKey: string,
    setTickets: React.Dispatch<React.SetStateAction<any[]>>,
) => {
    if (!wallet?.publicKey) {
        toast.error("Veuillez connecter votre portefeuille !");
        return;
    }

    const { program } = getAnchorProgram(wallet);

    // Initialisation de UMI avec les identités de portefeuille et le module mplTokenMetadata.
    const umi = createUmi(getNetworkUrl(process.env.NEXT_PUBLIC_REACT_APP_SOLANA_NETWORK!)).use(mplTokenMetadata()).use(walletAdapterIdentity(wallet));

    // Génération d'une nouvelle paire de clés pour le mint (NFT).
    const mint = web3.Keypair.generate();

    // Dérivez le compte d'adresse de jeton associé à l'atelier monétaire.
    // Calculer l'adresse du compte de token associé pour le mint.
    const associatedTokenAccount = await getAssociatedTokenAddress(mint.publicKey, wallet.publicKey);

    // Dérivez le compte de metadata PDA.
    // Calculer l'adresse du compte de metadata pour le mint.
    let metadataAccount = findMetadataPda(umi, {
        mint: publicKey(mint.publicKey),
    })[0];

    // Dérivez l'édition principale PDA.
    // Calculer l'adresse du compte de master edition pour le mint.
    let masterEditionAccount = findMasterEditionPda(umi, {
        mint: publicKey(mint.publicKey),
    })[0];

    const metadata = {
        name: "AlyraSOL",
        symbol: "ASOL",
        uri: "https://example.com/my-nft.json",
    };

    try {
        const txid = await program.methods
            .createNft(metadata.name, metadata.symbol, metadata.uri)
            .accounts({
                signer: wallet.publicKey, 
                mint: mint.publicKey, 
                // @ts-ignore
                associatedTokenAccount: associatedTokenAccount, 
                metadataAccount: metadataAccount, 
                masterEditionAccount: masterEditionAccount, 
                tokenProgram: TOKEN_PROGRAM_ID, 
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID, 
                tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID, 
                systemProgram: SystemProgram.programId, 
                rent: web3.SYSVAR_RENT_PUBKEY, 
                ticket: ticketPublicKey, 
            })
            .signers([mint]) 
            .rpc();

        toast.success("NFT Generated Successfully !");
        console.log(`solana confirm -v ${txid}`);

        const accounts = await program.account.ticket.all([
            {
                memcmp: {
                    offset: 8, 
                    bytes: eventPublicKey,
                },
            },
        ]);
        setTickets(accounts.map(({ publicKey, account }) => ({ publicKey, account })));
    } catch (err) {
        toast.error("Failed to create NFT.");
        console.error("Failed to create NFT.", err);
    }
};
