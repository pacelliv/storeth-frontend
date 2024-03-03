import { formatUnits } from "ethers";

export const createAccountsTableData = (ethPrice: bigint, data: ProcessedAccount[]) => {
    const normalizedPrice = ethPrice * 10n ** 10n;

    const USDDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    const tableData: TableData[] = [];

    data.forEach(el => {
        const usdBalance = (normalizedPrice * el.balance) / 10n ** 18n;
        const formattedBalance = USDDollar.format(Number(formatUnits(usdBalance, "ether")));
        tableData.push({ ...el, usdBalance: formattedBalance });
    });

    return tableData as ProcessedAccount[];
};
