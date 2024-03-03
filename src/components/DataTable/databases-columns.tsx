import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Contract>[] = [
    {
        accessorKey: "id",
        header: () => <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">Id</div>,
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">{id}</div>;
        }
    },
    {
        accessorKey: "contract",
        header: () => (
            <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">Contract</div>
        ),
        cell: ({ row }) => {
            const address = row.getValue("contract") as string;
            return (
                <div className="pl-5 text-start text-zinc-800 dark:text-zinc-300">{address}</div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const contract = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="text-zinc-800 hover:bg-zinc-300/50 dark:text-zinc-300 dark:hover:bg-zinc-300"
                        asChild
                    >
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="border-zinc-800/20 bg-zinc-100 dark:border-white/20 dark:bg-[#111110] dark:text-zinc-300"
                        align="end"
                    >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-800/20 dark:bg-white/20" />
                        <DropdownMenuItem
                            className="cursor-pointer focus:bg-zinc-300/40 focus:text-zinc-900 dark:focus:bg-zinc-900 dark:focus:text-white"
                            onClick={() => navigator.clipboard.writeText(contract.contract)}
                        >
                            Copy address
                        </DropdownMenuItem>
                        <Link href={`/databases/${contract.contract}?id=${contract.id}`}>
                            <DropdownMenuItem className="cursor-pointer focus:bg-zinc-300/40 focus:text-zinc-900 dark:focus:bg-zinc-900 dark:focus:text-white">
                                View
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
