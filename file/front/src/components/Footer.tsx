import Image from "next/image";
import React from "react";

const Footer = () => {
    const linksPart1 = [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "Services", url: "/services" },
        { name: "Contact", url: "/contact" },
    ];

    const linksPart2 = [
        { name: "Blog", url: "/blog" },
        { name: "Careers", url: "/careers" },
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" },
    ];

    const linksPart3 = [
        { name: "Support", url: "/support" },
        { name: "FAQ", url: "/faq" },
        { name: "Portfolio", url: "/portfolio" },
        { name: "Testimonials", url: "/testimonials" },
    ];

    return (
        <footer className="w-screen bg-gradient-to-tl from-[#050391] via-[#023d8af8] to-[#2c1864] backdrop- backdrop-opacity-20 text-white md:px-16 backdrop-blur-md mx-auto mt-10 py-6 px-6 overflow-hidden">
            <div className="block md:flex flex-wrap justify-between px-2">
                {/* Logo and Text Section */}
                <div className="flex-1 ">
                    <div className="flex-1 h-10 mb-2 w-64  relative overflow-hidden">
                        <Image src="/solanaLogo.svg" fill alt="Logo" className="h-10 mb-2" />
                    </div>
                    <br />
                    <p>
                        © 2024 <span className=" bg-gradient-to-bl from-[#fd1302] to-[#f3e305] text-transparent bg-clip-text">@defi_price </span>. All rights
                        reserved.
                    </p>
                </div>

                {/* Links Section */}
                <div className="flex-1">
                    <h4 className="font-bold mb-2">Quick Links</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <ul>
                            {linksPart1.map((link, index) => (
                                <li key={index} className="mb-1">
                                    <a href={link.url} className="text-gray-300 hover:text-white">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {linksPart2.map((link, index) => (
                                <li key={index} className="mb-1">
                                    <a href={link.url} className="text-gray-300 hover:text-white">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {linksPart3.map((link, index) => (
                                <li key={index} className="mb-1">
                                    <a href={link.url} className="text-gray-300 hover:text-white">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Additional Information Section */}
            <div className="mt-6 justify-center items-center flex border-t  pt-8">
                {/* <h4 className="font-bold mb-2">Additional Information</h4> */}
                <p>
                    Feel free to reach out to us at{" "}
                    <a href="mailto:info@mycompany.com" className="text-blue-400">
                        enochpromise.va@gmail.com
                    </a>
                    . Follow us on social media for the latest updates.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
