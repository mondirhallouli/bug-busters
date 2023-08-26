// contexts
import useBugsContext from "../hooks/useBugsContext";
// react router dom elements 
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
// date-fns to format date correctly
import { formatDistanceToNow } from "date-fns";
// components
import Comment from "../components/Comment";

export default function ReportPage() {
    const report = useLoaderData();
    const { reportId } = useParams();
    const { dispatch } = useBugsContext();
    // navigate to a path
    const navigate = useNavigate();

    const handleDelete = async () => {
        // send a post request to delete the report
        const response = await fetch(`http://localhost:3000/api/bugs/${reportId}`, {
            method: 'DELETE',
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE-REPORT', payload: json });
            navigate("/");
        }

    };

    return (
        <div className="report-page">
            <div className="container" >
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

export async function reportDetailsLoader({ params }) {
    const { reportId } = params;
    // fetch the data inside a try catch block
    const response = await fetch(`http://localhost:3000/api/bugs/${reportId}`);
    const json = await response.json();

    // else throw an error
    if (!response.ok) throw Error(json.error);
    // if response is ok return the data
    return json;
}