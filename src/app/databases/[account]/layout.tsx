import type { Metadata } from "next";

type Props = {
    params: { account: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
    const account = params.account;

    return {
        title: `Storeth | Database: ${account}`
    };
};

export default function AccountsLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
