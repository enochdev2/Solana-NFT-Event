
# NFT Ticketing in Solana / Anchor

<a href="https://github.com/s-damian/rust-solana-wallet">
<img src="https://raw.githubusercontent.com/s-damian/medias/main/technos-logos/rust.webp" alt="Rust Logo" height="100px">
</a>
<a href="https://github.com/s-damian/rust-solana-wallet">
<img src="https://raw.githubusercontent.com/s-damian/medias/main/technos-logos/solana.webp" alt="Solana Logo" height="100px">
</a>
<a href="https://github.com/s-damian/rust-solana-wallet">
<img src="https://raw.githubusercontent.com/s-damian/medias/main/technos-logos/anchor.webp" alt="Anchor Logo" height="100px">
</a>

> #Rust #Solana #Anchor #React #NFT # Web3

### Solana Event NFT 🎟️

### Summary:

The "Solana Event NFT" project is a sophisticated and innovative decentralized application (dApp) built on the Solana blockchain. It allows users to create, manage, and distribute event-based NFTs (Non-Fungible Tokens). The system is designed to streamline the ticketing process by minting NFTs for each ticket, enhancing security, and providing a unique digital collectible for attendees. By leveraging the speed and low fees of the Solana network, this dApp ensures efficient and cost-effective transactions, making it an ideal solution for event organizers and participants alike.

**Key Features:**

<h1> Event Creation:</h1>
   👉Customizable Events:** Organizers can easily create events with customizable details such as title, description, date, location, and ticket price.
   👉Streamlined Management:** The event creation process is integrated with Solana's system programs, ensuring secure and efficient setup.

<h1>Ticket Purchase:</h1>
   👉Secure Transactions:** Users can purchase event tickets seamlessly, with each transaction recorded on the blockchain, ensuring transparency and security.
   👉NFT Integration:** Tickets can optionally be linked to NFTs, providing attendees with a unique digital asset that serves as both a ticket and a collectible.

 <h1> NFT Minting:</h1>
   👉Custom NFTs:** Organizers can create custom NFTs with specific names, symbols, and metadata URIs, enhancing the event experience by offering exclusive digital assets.
   👉Master Edition NFTs:** Supports the creation of unique or limited-edition NFTs, perfect for exclusive events or special editions.

Advanced Account Management:
   👉Flexible Account Handling: The application supports complex account structures, including associated token accounts, metadata accounts, and master editions, ensuring a comprehensive and secure NFT management system.
   👉Safety Checks: Includes multiple safety checks and validations to ensure the integrity and security of NFT and ticket operations.

Error Handling:
   👉Detailed Error Messages: The application provides specific error codes and messages for common issues, helping users understand and resolve problems quickly.


This project exemplifies cutting-edge blockchain development, offering a seamless and secure solution for event management and NFT integration on the Solana network.

> NFT Marketplace Event Ticketing (**under development**)


## Prerequisites

Install Rust, Solana, Anchor on your computer.


## Technologies

* Rust
* Solana
* Anchor 0.29.0
* Solana-Web3.js
* Next.js 14
* React 18
* TypeScript
* Tailwind
* Phantom Wallet



## Using Solana Locally

```
solana config set --url localhost
```


## Install dependencies

On Anchor Program:

```
cd /[your-path]/anchor-nft-ticketing
```

```
npm install
```

On Next.js App:

```
cd /[your-path]/anchor-nft-ticketing/app/front
```

```
npm install
```


## Create your .env file on Next.js App:

```
cd /[your-path]/anchor-nft-ticketing/app/front
```

```
cp .env.example .env
```



## Solana Test Validator

Run solana-test-validator (with metaplex):

```
npm run ledger
```


## Build and Deploy

```
anchor build && anchor deploy
```


## IDL

Copy IDL:

```
cd /[your-path]/anchor-nft-ticketing
```

```
./sh/copy-idl.sh
```


## Change program ID

In the file :

```
target/idl/nft_ticketing.json
```

Find your program ID (with Anchor 0.29.0):

```
"metadata": {
    "address": "[YOUR_PROGRAM_ID]"
}
```

Then put this program ID in these files:

- ```Anchor.toml``` file:

```
nft_ticketing = "[YOUR_PROGRAM_ID]"
```

- ```programs/nft-ticketing/src/lib.rs``` file:

```
declare_id!("[YOUR_PROGRAM_ID]");
```

Build and deploy again:
```
anchor build && anchor deploy
```


## Run Front-End App (Next.js App):

```
cd /[your-path]/anchor-nft-ticketing/app/front
```

```
npm run dev
```
