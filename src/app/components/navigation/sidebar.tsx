import Link from "next/link";
import PwaInstallButton from "../pwa-install-button";

export default function Sidebar({
    isOpen,
    toggle,
}: {
    isOpen: boolean;
    toggle: () => void;
}) {
    return (
        <>
            <div
                className={`fixed top-0 w-full h-full overflow-hidden justify-center bg-white grid pt-[120px] left-0 z-50 ${isOpen ? "" : "hidden"}`}
            >
                <button className="absolute right-0 p-5" onClick={toggle}>
                    <CloseIcon />
                </button>

                <ul className="text-center text-black leading-relaxed text-xl flex flex-col gap-y-8">

                    <li>
                        <Link href="/">
                            <p>Events</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://forms.gle/qKwAdmRgGEDykowE8">
                            <p>Submit an Event</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.instagram.com/avondale_events/?hl=en">
                            <p>Follow on Instagram</p>
                        </Link>
                    </li>
                    <li>
                        <PwaInstallButton />
                    </li>
                </ul>
            </div>
        </>
    );
};

function CloseIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
        >
            <path
                fill="black"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
        </svg>
    );
}