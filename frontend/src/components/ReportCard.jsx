import { useEffect, useState } from "react";
// formatting date using date-fns library
import { formatDistanceToNow } from "date-fns";
// contexts
import useBugsContext from "../hooks/useBugsContext";
import useAuthContext from "../hooks/useAuthContext";
// react router elements
import { Link } from "react-router-dom";

export default function ReportCard({ report }) {
    const { dispatch } = useBugsContext();
    const { user } = useAuthContext();
    const [canDelete, setCanDelete] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleDelete = async () => {
        // exit out of the function if the user is not authenticated
        if (!user) {
            return;
        }

        // send a post request to delete the report
        const response = await fetch(`http://localhost:3000/api/bugs/${report._id}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${user.token}` }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE-REPORT', payload: json });
        }

    };

    const handleEdit = () => {

        // open the edit modal
        setOpenEdit(!openEdit);
    };

    useEffect(() => {
        if (user.username !== report.author) {
            setCanDelete(!canDelete);
            setCanEdit(!canEdit);
        }
    }, []);

    return (
        <>
            <div className="card" >
                <div className="info">
                    <p>{report.author ? `${report.author} asked:` : "Username asked:"}</p>
                    <section className="card-actions">
                        <button onClick={handleDelete} className="material-symbols-outlined delete" disabled={canDelete}>
                            delete
                        </button>
                        <button onClick={handleEdit} className="material-symbols-outlined edit-btn" disabled={canEdit}>
                            edit
                        </button>
                    </section>
                </div>
                <p className="date">{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</p>
                <Link to={`reports/${report._id}`}>
                    <h2>{report.title}</h2>
                    <p className="description">{report.description}</p>
                </Link>
            </div>
        </>
    );
}