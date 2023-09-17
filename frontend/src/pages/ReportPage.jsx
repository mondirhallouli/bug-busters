// contexts
import useBugsContext from "../hooks/useBugsContext";
import useAuthContext from "../hooks/useAuthContext";
// react router dom elements 
import { useNavigate, useParams } from "react-router-dom";
// date-fns to format date correctly
import { formatDistanceToNow } from "date-fns";
// components
import Comment from "../components/Comment";
import { useEffect, useState } from "react";
import CreateForm from "../components/CreateForm";

export default function ReportPage() {

    const [report, setReport] = useState(null);
    const { reportId } = useParams();
    const { dispatch } = useBugsContext();
    const { user } = useAuthContext();
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
        const response = await fetch(`http://localhost:3000/api/bugs/${reportId}`, {
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

    useEffect(() => {
        const getReportDetails = async () => {
            // fetch the data inside a try catch block
            const response = await fetch(`http://localhost:3000/api/bugs/${reportId}`, {
                headers: { "Authorization": `Bearer ${user.token}` },
            });
            const json = await response.json();

            // else throw an error
            if (!response.ok) throw Error(json.error);
            // if response is ok return the data
            setReport(json);
        }

        if (user) {
            getReportDetails();
        }

        if (report && (user.username !== report.author)) {
            console.log(`user.username: ${user.username}; report.author: ${report.author}`);
            setCanDelete(false);
            setCanEdit(false);
        }
    }, [user]);

    return (
        <div className="report-page">
            {!report && <div>loading...</div>}
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
            <Comment />

            <h2 className="font-inter font-bold text-base text-darkerblue mb-4">What do you think?</h2>

            {/* write a comment */}
            <form className="comment-form">
                <textarea
                    name="comment"
                    placeholder="write something here..."
                    className="block w-full p-4 font-openSans text-base mb-4 h-27 resize-y border border-zinc-400 rounded-md bg-white"
                />
                <button className="inline-block px-8 py-3 border border-darkerblue rounded-md bg-darkblue font-openSans text-base text-white cursor-pointer transition-colors hover:bg-darkerblue">
                    Submit
                </button>
            </form>

            {/* EDIT FORM/MODAL */}
            {openEdit && <CreateForm mode="Edit" report={report} openModal={setOpenEdit} />}
        </div>
    )
}