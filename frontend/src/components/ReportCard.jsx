import { useEffect, useState } from "react";
// formatting date using date-fns library
import { formatDistanceToNow } from "date-fns";
// contexts
import useBugsContext from "../hooks/useBugsContext";
import useAuthContext from "../hooks/useAuthContext";
// react router elements
import { Link } from "react-router-dom";
// components
import CreateForm from "./CreateForm";

export default function ReportCard({ report, getReports }) {
    const { dispatch } = useBugsContext();
    const { user } = useAuthContext();
    const [canDelete, setCanDelete] = useState(true);
    const [canEdit, setCanEdit] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);

    const handleDelete = async () => {
        // exit out of the function if the user is not authenticated
        if (!user) {
            return;
        }

        // send a post request to delete the report
        const response = await fetch(`${import.meta.env.VITE_BUGS_API_URL}/${report._id}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${user.token}` }
        });

        if (response.ok) {
            dispatch({ type: 'DELETE-REPORT', payload: report });
        }

    };

    const handleEdit = () => {

        // open the edit modal
        setOpenEdit(true);
    };

    useEffect(() => {
        if (user.username !== report.author) {
            setCanDelete(false);
            setCanEdit(false);
        }
    }, []);

    return (
        <>
            <div className="bg-white p-5 mb-4 border border-zinc-200 rounded-md transition-all hover:shadow-md" >

                <div className="flex justify-between items-center">

                    <p className="text-base italic text-gray-500">{report.author ? `${report.author} asked:` : "Username asked:"}</p>

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

                <Link to={`reports/${report._id}`}>
                    <h2 className="my-3 font-inter text-black text-lg font-bold">{report.title}</h2>
                    <p className="card-desc text-darkgray text-base italic overflow-hidden text-ellipsis line-clamp-3">{report.description}</p>
                </Link>

                {/* likes and comments */}
                <section className="flex justify-start items-center gap-3 mt-3 text-zinc-500">
                    <div className="flex justify-start items-center gap-2">
                        <span className="material-symbols-outlined text-xl">
                            comment
                        </span>
                        <span className="">{report.comments.length}</span>
                    </div>
                </section>
            </div>

            {/* EDIT FORM/MODAL */}
            {openEdit && <CreateForm mode="Edit" getReports={getReports} openModal={setOpenEdit} report={report} />}
        </>
    );
}