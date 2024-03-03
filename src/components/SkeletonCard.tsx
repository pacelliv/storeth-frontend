import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <h1 className="text-4xl font-extrabold text-zinc-800 dark:text-zinc-300">Loading...</h1>
        </div>
    );
};

export default SkeletonCard;
