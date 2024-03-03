"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { abi, chainContractMap } from "@/lib/build_factory";
import { CheckCircledIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { parseEther } from "ethers";

const VALID_NUM_DECIMALS = /^\d*\.?\d{0,18}$/;

const UpdateBalanceDialog = ({
    contractId,
    accountId
}: {
    contractId: string;
    accountId: string;
}) => {
    const { toast } = useToast();
    const chainId = useChainId();
    const { data: hash, isPending, writeContract } = useWriteContract();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const newBalance = formData.get("newBalance") as string;

        if (VALID_NUM_DECIMALS.test(newBalance)) {
            writeContract({
                abi,
                address: chainContractMap[chainId],
                functionName: "sfUpdateAccountBalance",
                args: [contractId, String(accountId), parseEther(newBalance)]
            });
        } else {
            toast({
                variant: "destructive",
                description: (
                    <div className="flex items-center gap-x-2 font-medium">
                        <CountdownTimerIcon className="h-4 w-4" /> Invalid amount of decimals.
                    </div>
                )
            });
        }
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
        confirmations: 2
    });

    console.log(isConfirming, isConfirmed);

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
                        <CheckCircledIcon className="h-4 w-4" /> Balance updated.
                    </div>
                )
            });
        }
    }, [isConfirmed]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border border-zinc-300 bg-zinc-300/70 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-300/90 dark:border dark:border-zinc-300/20 dark:bg-[#111110] dark:text-white dark:hover:border-zinc-300/50 dark:hover:bg-zinc-900">
                    Update balance
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-zinc-800 dark:text-zinc-300">
                        Update balance
                    </DialogTitle>
                    <DialogDescription>Insert the new balance for this account</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="newBalance"
                            className="min-w-max text-right text-zinc-800 dark:text-zinc-300"
                        >
                            New balance
                        </Label>
                        <Input
                            type="number"
                            name="newBalance"
                            id="newBalance"
                            className="col-span-3 text-zinc-800 dark:text-zinc-300"
                            required
                            autoComplete="off"
                            step="0.000000000000000001" // allows max 18 decimals on submit
                        />
                    </div>
                    <DialogFooter>
                        <Button disabled={isPending}>Update balance</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateBalanceDialog;
