import ConnectButton from "./ConnectButton";
import Link from "next/link";
import { TfiServer } from "react-icons/tfi";

const Navbar = () => {
    return (
        <nav className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-y-3 border-b border-gray-950/20 py-8 text-zinc-300 sm:flex-row dark:border-white/20 dark:text-zinc-300">
            <main className="flex items-center gap-2">
                <TfiServer size={22} className="text-rose-600" />
                <Link
                    className="text-2xl font-extrabold tracking-tight text-zinc-800/90 hover:text-zinc-800/80 dark:text-zinc-300 dark:hover:text-zinc-300/80"
                    href="/"
                >
                    storeth
                </Link>
            </main>
            <ConnectButton />
        </nav>
    );
};

export default Navbar;
