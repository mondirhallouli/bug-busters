import useAuthContext from "../hooks/useAuthContext";
import useBugsContext from "../hooks/useBugsContext";
import ReportCard from "../components/ReportCard";
import { useState, useEffect } from "react";

export default function MyReports() {
    const [filtered, setFiltered] = useState([]);
    const { user } = useAuthContext();
    const { reports } = useBugsContext();

    useEffect(() => {
        setFiltered(reports.filter(report => report.user.email == user.email));
    }, [reports, user]);

    return (
        <div className="homepage">
            <section className="card-container">
                {/* {!filtered && (<p>You haven't created any reports of your own...</p>)} */}
                {filtered && filtered.map(report => <ReportCard key={report._id} report={report} />)}
            </section>
        </div>
    );
}