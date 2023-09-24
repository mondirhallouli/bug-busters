import { formatDistanceToNow } from "date-fns";
import useAuthContext from "../hooks/useAuthContext";

export default function Comment({ comment, updateComments, reportId }) {
    const { user } = useAuthContext();

    // handleDeleteComment
    const handleDeleteComment = async (e) => {
        e.stopPropagation();

        // exit out of the function if the user is not authenticated
        if (!user) {
            return;
        }

        // send a post request to delete the report
        const response = await fetch(`${import.meta.env.VITE_BUGS_API_URL}/${reportId}/${comment._id}`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        let updatedReport = json.updatedReport;

        if (response.ok) {
            // change the comments prop on the report
            updateComments({ type: "UPDATE-COMMENTS", payload: updatedReport.comments });
        }
    }

    return (
        <section className="p-3 pl-4 mb-4 border rounded-md bg-white shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2 mb-2">
                    <p className="font-openSans font-semibold text-darkblue text-base">{comment.username}</p>
                    <p className="font-openSans text-sm text-zinc-400">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                </div>
                {
                    user.username === comment.username && (<button
                        className="material-symbols-outlined text-2xl text-gray-500"
                        onClick={handleDeleteComment}
                    >
                        delete
                    </button>)
                }
            </div>
            <p className="font-openSans text-sm text-darkgray italic">{comment.content}</p>
        </section>
    );
}