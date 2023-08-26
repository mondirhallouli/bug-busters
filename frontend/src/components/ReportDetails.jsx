// formatting date using date-fns library
import { formatDistanceToNow } from "date-fns";
// contexts
import useBugsContext from "../hooks/useBugsContext";
// react router elements
import { Link } from "react-router-dom";

export default function ReportDetails({ report }) {
    const { dispatch } = useBugsContext()

    const handleDelete = async () => {
        // send a post request to delete the report
        const response = await fetch(`http://localhost:3000/api/bugs/${report._id}`, {
            method: 'DELETE',
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE-REPORT', payload: json });
        }

    };

    return (
        <Link to={`reports/${report._id}`}>
            <div className="card" >
                <div className="info">
                    <p>Username asked:</p>
                    <span onClick={handleDelete} className="material-symbols-outlined">
                        delete
                    </span>
                </div>
                <p className="date">{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</p>
                <h2>{report.title}</h2>
                <p className="description">{report.description}</p>
            </div>
        </Link>
    );
}