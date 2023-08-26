import { useEffect, useState } from 'react';
import CreateForm from "../components/CreateForm";
import ReportDetails from '../components/ReportDetails';
import useBugsContext from '../hooks/useBugsContext';

export default function HomePage() {
    const { reports, dispatch } = useBugsContext()

    useEffect(() => {
        const getReports = async () => {
            // fetch the reports from the server
            const response = await fetch('http://localhost:3000/api/bugs');
            const json = await response.json();

            // if response is ok, set reports to a state variable
            if (response.ok) {
                dispatch({ type: 'SET-REPORTS', payload: json });
            }
        };

        getReports();
    }, [dispatch]);

    return (
        <div className="homepage">
            <section className="cards-container">
                {
                    reports && reports.map(report => (
                        <ReportDetails key={report._id} report={report} />
                    ))
                }
            </section>

            <CreateForm />
        </div>
    )
}