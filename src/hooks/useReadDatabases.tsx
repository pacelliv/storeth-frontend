"use client";

import { useReadContract, useAccount, useChainId } from "wagmi";
import { abi, chainContractMap } from "@/lib/build_factory";

interface ReturnedData {
    data: Contract[];
    isLoadingDb: boolean;
}

const useReadDatabases = (): ReturnedData => {
    const { address } = useAccount();
    const chainId = useChainId();

    const { data, isLoading: isLoadingDb } = useReadContract({
        abi,
        address: chainContractMap[chainId],
        functionName: "sfGetDatabases",
        args: [address]
    });

    const processedData = data as string[] | undefined;

    if (processedData) {
        return {
            data: processedData.map((data, i) => ({ id: i, contract: data })),
            isLoadingDb
        };
    } else {
        return { data: [], isLoadingDb };
    }
};

export default useReadDatabases;
