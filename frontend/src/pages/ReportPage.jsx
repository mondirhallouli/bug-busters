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

export default function ReportPage() {
    const [report, setReport] = useState(null);
    const { reportId } = useParams();
    const { dispatch } = useBugsContext();
    const { user } = useAuthContext();
    // navigate to a path
    const navigate = useNavigate();
    const [canDelete, setCanDelete] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
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
        setOpenEdit(!openEdit);
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
            setCanDelete(!canDelete);
            setCanEdit(!canEdit);
        }
    }, [user]);

    return (
        <div className="report-page">
            {!report && <div>loading...</div>}
            {
                report && (<div className="container" >
                    <div className="info">
                        <p>{report.author ? `${report.author} asked:` : "Anonymous asked:"}</p>
                        <section className="card-actions">
                            <button onClick={handleDelete} className="material-symbols-outlined" disabled={canDelete}>
                                delete
                            </button>
                            <button onClick={handleEdit} className="material-symbols-outlined edit-btn" disabled={canEdit}>
                                edit
                            </button>
                        </section>
                    </div>
                    <p className="date">{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</p>
                    <h2>{report.title}</h2>
                    <p className="description">{report.description}</p>
                </div>
                )}

            <h2 className="section-title">Comments:</h2>

            {/* comments section */}
            <Comment />

            <h2 className="section-title">What do you think?</h2>

            {/* write a comment */}
            <form className="comment-form">
                <textarea name="comment" placeholder="write something here..." />
                <button>Submit</button>
            </form>
        </div>
    )
}