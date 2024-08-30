import React from "react";
import NavBar from "./NavBar";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const wallet = useAnchorWallet();

    const contextClass = {
        success: "bg-blue-600",
        error: "bg-red-600",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    return (
        <div className=" mx-auto text-center flex flex-col w-screen min-h-screen">
            <NavBar />
            <div className="flex-grow flex flex-col  ">
                {wallet?.publicKey ? (
                    <>
                        {children}
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            toastClassName={(context) => contextClass[context?.type || "default"] + " overflow-hidden"}
                            bodyClassName={() => "text-sm font-white font-med block p-3"}
                            className="toast-container"
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-xl text-gray-800 mb-4">Veuillez connecter votre portefeuille pour continuer.</p>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
