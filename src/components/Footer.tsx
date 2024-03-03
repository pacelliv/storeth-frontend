import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="mx-auto mt-auto flex w-full max-w-4xl flex-col items-center justify-between gap-y-4 border-t border-zinc-950/20 py-8 sm:flex-row sm:py-9 dark:border-white/20">
            <p className="font-light text-zinc-950 dark:text-zinc-300">
                Powered by <span className="font-bold">love</span> and{" "}
                <span className="font-bold">Cyfrin teachings</span>.
            </p>
            <a
                className="flex cursor-pointer items-center gap-2 rounded-full border border-zinc-400 bg-zinc-500/20 px-4 py-2 text-sm font-normal text-slate-900 backdrop-blur-sm hover:bg-zinc-700/20 dark:bg-zinc-400 dark:hover:bg-white/20"
                href="https://github.com/pacelliv/storeth/"
                target="_blank"
            >
                <FaGithub size={20} /> Star on GitHub
            </a>
        </div>
    );
};

export default Footer;
