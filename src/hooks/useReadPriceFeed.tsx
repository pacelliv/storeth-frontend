"use client";

import { useReadContract, useChainId } from "wagmi";
import { abi, chainPriceFeedMap } from "@/lib/build_pricefeed";

const useReadPriceFeed = () => {
    const chainId = useChainId();

    const { data, isLoading: isLoadingResponse } = useReadContract({
        abi,
        address: chainPriceFeedMap[chainId],
        functionName: "latestRoundData"
    });

    const processedData = data as bigint[];
    return { price: processedData ? processedData[1] : null, isLoadingResponse };
};

export default useReadPriceFeed;
