import UpdateBalanceDialog from "../UpdateBalanceDialog";
import { formatUnits } from "ethers";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProcessedAccount>[] = [
    {
        accessorKey: "id",
        header: () => <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">Id</div>,
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">{id}</div>;
        }
    },
    {
        accessorKey: "firstName",
        header: () => (
            <div className="min-w-max pl-5 text-start text-zinc-800 dark:text-zinc-300">
                First name
            </div>
        ),
        cell: ({ row }) => {
            const firstName = row.getValue("firstName") as string;
            return (
                <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">{firstName}</div>
            );
        }
    },
    {
        accessorKey: "lastName",
        header: () => (
            <div className="min-w-max pl-5 text-start text-zinc-800 dark:text-zinc-300">
                Last name
            </div>
        ),
        cell: ({ row }) => {
            const lastName = row.getValue("lastName") as string;
            return (
                <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">{lastName}</div>
            );
        }
    },
    {
        accessorKey: "email",
        header: () => <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">Email</div>,
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">{email}</div>;
        }
    },
    {
        accessorKey: "balance",
        header: () => (
            <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">Balance</div>
        ),
        cell: ({ row }) => {
            const balance = row.getValue("balance") as string;
            return (
                <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">
                    {formatUnits(balance.toString(), "ether")} ETH
                </div>
            );
        }
    },
    {
        accessorKey: "usdBalance",
        header: () => <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">USD</div>,
        cell: ({ row }) => {
            const usdBalance = row.getValue("usdBalance") as string;
            return (
                <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">{usdBalance}</div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const contractId = new URLSearchParams(document.location.search).get("id") as string;
            const accountId = row.getValue("id") as string;
            return <UpdateBalanceDialog contractId={contractId} accountId={accountId} />;
        }
    }
];
