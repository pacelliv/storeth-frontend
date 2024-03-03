"use client";

import ConnectButton from "@/components/ConnectButton";
import useReadDatabases from "@/hooks/useReadDatabases";
import SkeletonCard from "@/components/SkeletonCard";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircledIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/DataTable/databases-columns";
import { DataTable } from "@/components/DataTable/databases-table";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { chainContractMap, abi } from "@/lib/build_factory";
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const Databases = () => {
    const chainId = useChainId();
    const { toast } = useToast();
    const { isConnected } = useAccount();
    const { data, isLoadingDb } = useReadDatabases();
    const { data: hash, isPending, writeContract: createDatabase } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
        confirmations: 2
    });

    const handleClick = () => {
        createDatabase({
            abi,
            address: chainContractMap[chainId],
            functionName: "createSimpleStorage"
        });
    };

    useEffect(() => {
        if (isConfirming) {
            toast({
                description: (
                    <div className="flex items-center gap-x-2 font-medium">
                        <CountdownTimerIcon className="h-4 w-4" /> Waiting for confirmation.
                    </div>
                )
            });
        }
    }, [isConfirming]);

    useEffect(() => {
        if (isConfirmed) {
            toast({
                description: (
                    <div className="flex items-center gap-x-2 font-medium">
                        <CheckCircledIcon className="h-4 w-4" /> Database created.
                    </div>
                )
            });
        }
    }, [isConfirmed]);

    if (!isConnected) {
        return (
            <div className="mx-auto mb-24 flex flex-col items-center gap-y-7 pt-14 text-center text-3xl font-extrabold sm:pt-28 sm:text-4xl">
                <h1 className="text-zinc-800 dark:text-zinc-300">
                    Connect your wallet <br /> to use the app.
                </h1>
                <ConnectButton />
            </div>
        );
    }

    if (isLoadingDb) {
        return (
            <div className="mb-24 w-full pt-16">
                <SkeletonCard />
            </div>
        );
    }

    return (
        <div className="w-full pt-8">
            {data.length > 0 ? (
                <>
                    <div className="flex w-full items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-x-2 p-0 text-zinc-800 hover:underline dark:text-zinc-300"
                        >
                            <ArrowLeftIcon /> Back home
                        </Link>
                        <h3 className="hidden text-2xl font-bold text-zinc-800 sm:block dark:text-zinc-300">
                            Databases
                        </h3>
                        <Button disabled={isPending} variant="destructive" onClick={handleClick}>
                            Create database
                        </Button>
                    </div>
                    <div className="py-12">
                        <DataTable data={data} columns={columns} />
                    </div>
                </>
            ) : (
                <div className="mx-auto mb-24 flex flex-col items-center gap-y-7 pt-14 text-center text-3xl font-extrabold sm:pt-28 sm:text-4xl">
                    <h1 className="text-zinc-800 dark:text-zinc-300">
                        You have no databases. <br /> Create one.
                    </h1>
                    <Button
                        disabled={isPending}
                        onClick={handleClick}
                        variant="destructive"
                        className="cursor-pointer rounded-full p-6"
                    >
                        Create database
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Databases;
