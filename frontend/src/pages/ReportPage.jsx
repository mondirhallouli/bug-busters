// contexts
import useBugsContext from "../hooks/useBugsContext";
import useAuthContext from "../hooks/useAuthContext";
// react router dom elements 
import { useNavigate, useParams } from "react-router-dom";
// date-fns to format date correctly
import { formatDistanceToNow } from "date-fns";
// components
import Comment from "../components/Comment";
import { useEffect, useRef, useState } from "react";
import CreateForm from "../components/CreateForm";
// skeleton loader
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function ReportPage() {

    const [report, setReport] = useState(null);
    const reportComments = useRef([]);

    const { reportId } = useParams();
    const { dispatch } = useBugsContext();
    const { user } = useAuthContext();
    // comment form state
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null);
    // navigate to a path
    const navigate = useNavigate();

    const [canDelete, setCanDelete] = useState(true);
    const [canEdit, setCanEdit] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);

    // this handles the deletion on the report page
    const handleDelete = async () => {
        // exit out of the function if the user is not authenticated
        if (!user) {
            return;
        }

        // send a post request to delete the report
        const response = await fetch(`${import.meta.env.VITE_BUGS_API_URL}/${reportId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE-REPORT', payload: json });
            navigate("/");
        }

    };

    // handle the editing of a report
    const handleEdit = () => {

        // open the edit modal
        setOpenEdit(true);
    };

    // add a comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        setCommentError(null);

        // create request body
        const commentData = { username: user.username, content: comment };
        // make the request
        const response = await fetch(`${import.meta.env.VITE_BUGS_API_URL}/${report._id}/addComment`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(commentData),
        });
        // extract data from response
        const json = await response.json();

        if (!response.ok) {
            setCommentError(json.error);
        }

        if (response.ok) {
            setComment("");
            updateReportComments({ type: "UPDATE-COMMENTS", payload: json.report.comments })
        }
    };

    // function to update the reportComments ref array
    function updateReportComments(action) {
        switch (action.type) {
            case 'SET-COMMENTS':
                reportComments.current = action.payload;
                break;
            case 'UPDATE-COMMENTS':
                reportComments.current = [...action.payload];
                break;
        }
    }

    useEffect(() => {
        const getReportDetails = async () => {
            // fetch the data inside a try catch block
            const response = await fetch(`${import.meta.env.VITE_BUGS_API_URL}/${reportId}`, {
                headers: { "Authorization": `Bearer ${user.token}` },
            });
            const json = await response.json();

            // else throw an error
            if (!response.ok) throw Error(json.error);
            // if response is ok return the data
            setReport(json.report);
            // reportComments.current = json.comments;
            updateReportComments({ type: 'SET-COMMENTS', payload: json.report.comments });
        }

        if (user) {
            getReportDetails();
        }

        // FIXME:
        // if (report && (user.username !== report.author)) {
        //     console.log(`user.username: ${user.username}; report.author: ${report.author}`);
        //     setCanDelete(false);
        //     setCanEdit(false);
        // }
    }, [user, updateReportComments]);

    return (
        <div className="report-page" >
            {!report && <Skeleton count={10} enableAnimation={true} />}
            {
                report && (<div className="bg-white p-5 mb-4 border border-zinc-200 rounded-md transition-all shadow-md" >
                    <div className="flex justify-between items-center">

                        <p className="text-base italic text-gray-500">{report.author ? `${report.author} asked:` : "Anonymous asked:"}</p>

                        {
                            canDelete && canEdit && (<section className="flex justify-center items-center">

                                <button onClick={handleDelete} className="material-symbols-outlined block w-9 h-9 bg-transparent border-0 cursor-pointer transition-all text-zinc-500 hover:text-zinc-700">
                                    delete
                                </button>

                                <button onClick={handleEdit} className="material-symbols-outlined block w-9 h-9 bg-transparent border-0 cursor-pointer transition-all text-zinc-500 hover:text-zinc-700">
                                    edit
                                </button>
                            </section>)
                        }
                    </div>
                    <p className="text-sm text-zinc-500">{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</p>
                    <h2 className="my-3 font-inter text-black text-lg font-bold">{report.title}</h2>
                    <p className="card-desc font-openSans text-darkgray text-base italic">{report.description}</p>
                </div>)
            }

            <h2 className="font-inter font-bold text-base text-darkerblue mb-4">Comments:</h2>

            {/* comments section */}
            {
                !reportComments.current.length && <p className="font-openSans text-sm italic text-zinc-500 mb-4">No comments...</p>
            }
            {
                reportComments.current && reportComments.current.map((comment) => (
                    <Comment
                        comment={comment}
                        updateComments={updateReportComments}
                        reportId={report._id}
                        key={comment._id}
                    />
                ))
            }


            <h2 className="font-inter font-bold text-base text-darkerblue mb-4">What do you think?</h2>

            {/* write a comment */}
            <form className="comment-form" onSubmit={handleAddComment}>
                <textarea
                    name="comment"
                    placeholder="write something here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="block w-full p-4 font-openSans text-base mb-4 h-27 resize-y border border-zinc-400 rounded-md bg-white"
                />
                <button className="inline-block px-8 py-3 border border-darkerblue rounded-md bg-darkblue font-openSans text-base text-white cursor-pointer transition-colors hover:bg-darkerblue">
                    Submit
                </button>

                {/* comment error message */}
                {commentError && <p className="text-base font-openSans text-pinkred bg-pinkwhite border border-pinkred p-4">{commentError}</p>}
            </form>

            {/* EDIT FORM/MODAL */}
            {openEdit && <CreateForm mode="Edit" report={report} openModal={setOpenEdit} />}
        </div>
    )
}