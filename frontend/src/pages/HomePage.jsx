import { useEffect, useState } from 'react';
import CreateForm from "../components/CreateForm";
import ReportCard from '../components/ReportCard';
import useBugsContext from '../hooks/useBugsContext';
import useAuthContext from '../hooks/useAuthContext';

export default function HomePage() {
    const { reports, dispatch } = useBugsContext()
    const { user } = useAuthContext();
    const [filtered, setFiltered] = useState(null);

    const handleFilter = () => {
        const filteredItems = reports.filter(report => report.author === user.username);
        setFiltered(filteredItems);
    };

    const handleFilterAll = () => {
        setFiltered(reports);
    };

    useEffect(() => {
        const getReports = async () => {
            // fetch the reports from the server
            const response = await fetch('http://localhost:3000/api/bugs', {
                headers: { "Authorization": `Bearer ${user.token}` },
            });
            const json = await response.json();

            // if response is ok, set reports to a state variable
            if (response.ok) {
                dispatch({ type: 'SET-REPORTS', payload: json });
            }
        };

        if (user) {
            getReports();
        }

    }, [dispatch, user]);

    return (
        <div className="">
            <section>
                <section className="mb-4">
                    <button onClick={handleFilterAll} className='border border-darkblue rounded-md p-2 mr-4 text-sm text-darkblue bg-transparent transition-colors hover:bg-darkblue hover:text-pinkwhite'>All reports</button>
                    <button onClick={handleFilter} className='border border-darkblue rounded-md p-2 mr-4 text-sm text-darkblue bg-transparent transition-colors hover:bg-darkblue hover:text-pinkwhite'>My reports</button>
                </section>

                {
                    !filtered && reports && reports.map(report => (
                        <ReportCard key={report._id} report={report} />
                    ))
                }
                {
                    filtered && filtered.map(report => (
                        <ReportCard key={report._id} report={report} />
                    ))
                }
            </section>

            {/* <CreateForm /> */}
        </div>
    )
}