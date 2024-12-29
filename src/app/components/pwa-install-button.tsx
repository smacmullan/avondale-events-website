import React, { useEffect, useState } from "react";

export default function PwaInstallButton(){
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIos, setIsIos] = useState(false);
    const [isInStandaloneMode, setIsInStandaloneMode] = useState<boolean | null>(null);

    useEffect(() => {
        // Detect iOS Safari
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

        setIsIos(isIosDevice);
        setIsInStandaloneMode(isStandalone);

        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault(); // Prevent the default mini-infobar
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                setDeferredPrompt(null);
            });
        } else if (isIos && !isInStandaloneMode) {
            alert(
                "To install this app, tap the 'Share' button in Safari, then select 'Add to Home Screen'."
            );
        } else {
            alert("PWA installation is not supported on this browser.");
        }
    };

    if (isInStandaloneMode || isInStandaloneMode === null) {
        return null; // Hide the button if the PWA is already installed
    }

    return (
        <button
            onClick={handleInstallClick}
            className="px-4 pb-4 text-blue-500 text-sm underline"
        >
            Get the App
        </button>
    );
};