"use client";

import ConnectButton from "@/components/ConnectButton";
import useReadAccounts from "@/hooks/useReadAccounts";
import useReadPriceFeed from "@/hooks/useReadPriceFeed";
import CreateAccountDialog from "@/components/CreateAccountDialog";
import SkeletonCard from "@/components/SkeletonCard";
import Link from "next/link";
import { columns } from "@/components/DataTable/accounts-columns";
import { DataTable } from "@/components/DataTable/accounts-table";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { abi, chainContractMap } from "@/lib/build_factory";
import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { createAccountsTableData } from "@/lib/createTableData";
import { CheckCircledIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Accounts = () => {
    const id = new URLSearchParams(document.location.search).get("id") as string;
    const { price, isLoadingResponse } = useReadPriceFeed();
    const { toast } = useToast();
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const { data, isLoadingDb } = useReadAccounts(id);
    const { data: hash, isPending, writeContract } = useWriteContract();
    let tableData;

    const handleCreateDbClick = (args: string[]) => {
        writeContract({
            abi,
            address: chainContractMap[chainId],
            functionName: "sfCreateAccount",
            args: [id, ...args]
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
        confirmations: 2
    });

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
                        <CheckCircledIcon className="h-4 w-4" /> Account created.
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

    if (isLoadingDb || isLoadingResponse) {
        return (
            <div className="mb-24 w-full pt-16">
                <SkeletonCard />
            </div>
        );
    }

    if (price) {
        tableData = createAccountsTableData(price, data) as ProcessedAccount[];
    }

    return (
        <div className="w-full pt-8">
            {data.length > 0 ? (
                <>
                    <div className="flex w-full items-center justify-between">
                        <Link
                            href="/databases"
                            className="flex items-center gap-x-2 p-0 text-zinc-800 hover:underline dark:text-zinc-300"
                        >
                            <ArrowLeftIcon /> Back to databases
                        </Link>
                        <h3 className="hidden text-2xl font-bold text-zinc-800 sm:block dark:text-zinc-300">
                            Accounts
                        </h3>
                        <CreateAccountDialog
                            isPending={isPending}
                            handleCreateDbClick={handleCreateDbClick}
                            classes=""
                        />
                    </div>
                    <div className="py-12">
                        <DataTable data={tableData!!} columns={columns} />
                    </div>
                </>
            ) : (
                <div className="relative mx-auto mb-24 flex flex-col items-center gap-y-7 pt-14 text-center text-3xl font-extrabold sm:pt-28 sm:text-4xl">
                    <Link
                        href="/databases"
                        className="absolute left-0 top-0 flex items-center gap-x-2 p-0 text-base font-normal text-zinc-800 hover:underline dark:text-zinc-300"
                    >
                        <ArrowLeftIcon /> Back to databases
                    </Link>
                    <h1 className="text-zinc-800 dark:text-zinc-300">
                        This database is empty. <br /> Add an account.
                    </h1>
                    <CreateAccountDialog
                        isPending={isPending}
                        handleCreateDbClick={handleCreateDbClick}
                        classes="rounded-full p-6"
                    />
                </div>
            )}
            ;
        </div>
    );
};

export default Accounts;
