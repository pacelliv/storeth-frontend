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

const CreateAccountDialog = ({
    isPending,
    handleCreateDbClick,
    classes
}: {
    isPending: boolean;
    handleCreateDbClick: (args: string[]) => void;
    classes: string;
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;

        handleCreateDbClick([firstName, lastName, email]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={classes} variant="destructive">
                    Create account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-zinc-800 dark:text-zinc-300">
                        Create account
                    </DialogTitle>
                    <DialogDescription>Fill the inputs to create a new account</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="firstName"
                            className="text-right text-zinc-800 dark:text-zinc-300"
                        >
                            First name
                        </Label>
                        <Input
                            name="firstName"
                            id="firstName"
                            className="col-span-3 text-zinc-800 dark:text-zinc-300"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="lastName"
                            className="text-right text-zinc-800 dark:text-zinc-300"
                        >
                            Last name
                        </Label>
                        <Input
                            name="lastName"
                            id="lastName"
                            className="col-span-3 text-zinc-800 dark:text-zinc-300"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="email"
                            className="text-right text-zinc-800 dark:text-zinc-300"
                        >
                            Email
                        </Label>
                        <Input
                            name="email"
                            type="email"
                            id="email"
                            className="col-span-3 text-zinc-800 dark:text-zinc-300"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <DialogFooter>
                        <Button disabled={isPending}>Create account</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAccountDialog;
