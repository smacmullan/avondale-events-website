import Link from "next/link";

export default function Navbar({ toggle }: { toggle: () => void }) {
  return (
    <>
      <div className="w-full h-16 bg-white border-b-2 border-gray-200 fixed top-0 z-40">
        <div className="lg:container mx-auto px-6 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/" className="flex align-middle">
              <Logo />
              <div className="flex items-center ml-4">
                <p className="text-black text-xl font-medium">Avondale Events</p>
              </div>
            </Link>
            <button className="cursor-pointer" onClick={toggle}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6 text-black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function Logo() {
  return (
    <img
      src="../icon.png"
      alt="ward wise logo"
      width={50}
      height={50}
    />
  );
}