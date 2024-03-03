export const abi = [
    { anonymous: false, inputs: [], name: "AccountUpdated", type: "event" },
    { anonymous: false, inputs: [], name: "NewAccount", type: "event" },
    { anonymous: false, inputs: [], name: "NewSimpleStorage", type: "event" },
    {
        inputs: [],
        name: "createSimpleStorage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            { internalType: "uint256", name: "_index", type: "uint256" },
            { internalType: "string", name: "_firstName", type: "string" },
            { internalType: "string", name: "_lastName", type: "string" },
            { internalType: "string", name: "_email", type: "string" }
        ],
        name: "sfCreateAccount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            { internalType: "address", name: "_manager", type: "address" },
            { internalType: "uint256", name: "_index", type: "uint256" }
        ],
        name: "sfGetAccounts",
        outputs: [
            {
                components: [
                    { internalType: "string", name: "firstName", type: "string" },
                    { internalType: "string", name: "lastName", type: "string" },
                    { internalType: "string", name: "email", type: "string" },
                    { internalType: "uint256", name: "balance", type: "uint256" }
                ],
                internalType: "struct SimpleStorage.Account[]",
                name: "",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "address", name: "_manager", type: "address" }],
        name: "sfGetDatabases",
        outputs: [{ internalType: "contract SimpleStorage[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { internalType: "uint256", name: "_contractIndex", type: "uint256" },
            { internalType: "uint256", name: "_accountIndex", type: "uint256" },
            { internalType: "uint256", name: "_newBalance", type: "uint256" }
        ],
        name: "sfUpdateAccountBalance",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];

export const chainContractMap: ChainContractMap = {
    11155111: "0x84134F7576a7A491EC1858Cd9E32a779C56936f4"
};

export const supportedChains = [11155111];
