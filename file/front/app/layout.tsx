import "./globals.css";
import AppWalletProvider from "../src/components/AppWalletProvider";
import ClientOnly from "../src/components/ClientOnly";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen w-screen bg-hero-pattern bg-cover bg-no-repeat bg-center overflow-x-hidden font-sans antialiased">
                <title>Anchor NFT Ticketing</title>
                <ClientOnly>
                    <AppWalletProvider>{children}</AppWalletProvider>
                </ClientOnly>
            </body>
        </html>
    );
}
