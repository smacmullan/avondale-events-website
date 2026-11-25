import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isIos, setIsIos] = useState(false);
    const [isInStandaloneMode, setIsInStandaloneMode] = useState<boolean | null>(null);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent) ||
            (/macintosh/.test(userAgent) && window.navigator.maxTouchPoints > 1);
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
            ("standalone" in window.navigator && window.navigator.standalone === true);

        setIsIos(isIosDevice);
        setIsInStandaloneMode(isStandalone);

        const handleBeforeInstallPrompt = (event: Event) => {
            if (!("prompt" in event) || typeof event.prompt !== "function" || !("userChoice" in event)) {
                return;
            }

            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            try {
                await deferredPrompt.prompt();
                const choiceResult = await deferredPrompt.userChoice;
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                setDeferredPrompt(null);
            } catch (error) {
                console.error("Unable to start PWA installation", error);
                alert("The app could not be installed. Please try again later.");
            }
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
            className="px-4"
        >
            Get the App
        </button>
    );
};