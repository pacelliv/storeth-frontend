"use client";

import { useReadContract, useAccount, useChainId } from "wagmi";
import { abi, chainContractMap } from "@/lib/build_factory";

const useReadAccounts = (index: string) => {
    const { address } = useAccount();
    const chainId = useChainId();

    const { data, isLoading: isLoadingDb } = useReadContract({
        abi,
        address: chainContractMap[chainId],
        functionName: "sfGetAccounts",
        args: [address, index]
    });

    const processedData = data as Account[] | undefined;

    return {
        data: processedData ? processedData.map((data, i) => ({ id: i, ...data })) : [],
        isLoadingDb
    };
};

export default useReadAccounts;
