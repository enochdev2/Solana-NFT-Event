import { toast } from "react-toastify";

export const handleCopyToClipboard = (publicKey: string) => {
    navigator.clipboard.writeText(publicKey).then(
        () => {
            toast.info("Public Key copied to the clipboard.");
        },
        (err) => {
            console.error("Failed to copy public key:", err);
        },
    );
};




export const programId = "Bj3Tg7NaUr8uRgZe358gutaqqNLvDJDZ3EzJXp9gNL44"