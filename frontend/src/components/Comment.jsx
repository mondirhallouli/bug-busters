import { formatDistanceToNow } from "date-fns";

export default function Comment({ comment }) {
    return (
        <section className="p-3 pl-4 mb-4 border rounded-md bg-white shadow-md">
            <div className="flex justify-start items-center gap-2 mb-2">
                <p className="font-openSans font-semibold text-darkblue text-base">{comment.username}</p>
                <p className="font-openSans text-sm text-zinc-400">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
            </div>
            <p className="font-openSans text-sm text-darkgray italic">{comment.content}</p>
        </section>
    );
}