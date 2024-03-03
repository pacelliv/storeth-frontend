type PriceFeedResponse = bigint[];

type Contract = {
    id: number;
    contract: string;
};

interface ChainContractMap {
    [key: number]: `0x${string}`;
}

interface Account {
    balance: bigint;
    firstName: string;
    lastName: string;
    email: string;
}

interface ProcessedAccount extends Account {
    id: number;
}

interface TableData extends ProcessedAccount {
    usdBalance: string;
}

interface ReturnedData {
    data: ProcessedAccount[];
    isLoadingDb: boolean;
}

interface PriceFeedResponse {
    price: bigint;
    isLoadingResponse: boolean;
}
