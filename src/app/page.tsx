import Link from "next/link";

const Home = () => {
    return (
        <div className="pt-14 sm:pt-28">
            <h1 className="mb-10 inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-4xl font-extrabold text-transparent sm:max-w-2xl sm:text-left sm:text-5xl">
                Store, manage and view your clients data.
            </h1>

            <div className="mb-24 flex flex-col items-center gap-4 sm:flex-row">
                <Link
                    href="databases"
                    className="rounded-full bg-slate-700 px-6 py-3 text-base font-light text-white backdrop-blur-sm hover:bg-slate-700/90 sm:px-8 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-800/85"
                >
                    Start managing
                </Link>
                <a
                    className="rounded-full bg-neutral-300 px-6 py-3 text-base font-normal text-zinc-950 backdrop-blur-sm hover:bg-neutral-300/80 sm:px-8 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-700/90"
                    href="https://github.com/pacelliv/storeth/"
                    target="_blank"
                >
                    Learn how it&apos;s built
                </a>
            </div>
        </div>
    );
};

export default Home;
