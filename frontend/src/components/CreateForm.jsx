import { useEffect, useState } from "react";
import useBugsContext from '../hooks/useBugsContext';
import useAuthContext from "../hooks/useAuthContext";

export default function CreateForm({ mode, getReports, openModal, report }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [emptyFields, setEmptyFields] = useState([]);

    const [error, setError] = useState(null);
    const { dispatch } = useBugsContext();
    const { user } = useAuthContext();

    // create report handler
    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        // exit the function if user is not authenticated
        if (!user) {
            setError("You must be logged in to continue");
            return;
        }

        // save the body data in an object
        const data = { title, description };

        // send a post request to the server
        const response = await fetch('http://localhost:3000/api/bugs', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user.token}` },
            body: JSON.stringify(data),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setDescription('');
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'ADD-REPORT', payload: json });
            openModal(false);
        }
    };


    // edit report handler
    const handleEditSubmit = async (event) => {
        event.preventDefault();

        // exit the function if user is not authenticated
        if (!user) {
            setError("You must be logged in to continue");
            return;
        }

        // save the body data in an object
        const data = { title, description };

        // send a post request to the server
        const response = await fetch(`http://localhost:3000/api/bugs/${report._id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user.token}` },
            body: JSON.stringify(data),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            // setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setDescription('');
            setError(null);
            // setEmptyFields([]);
            // dispatch({ type: 'UPDATE-REPORT', payload: json })
            openModal(false);
            getReports();
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();

        // close the edit form
        openModal(false);
    };

    useEffect(() => {
        // populate the input fields with report data
        if (mode === "Edit" && report) {
            setTitle(report.title);
            setDescription(report.description);
        }
    }, []);

    return (
        <div className="w-full h-full p-4 fixed box-border top-0 left-0 flex flex-col justify-center items-center bg-black/75">
            <section className="w-full md:w-4/6 lg:w-2/4 shadow-lg border rounded-md mx-auto bg-white p-4">
                <h2 className="mb-7 text-darkblue text-xl font-semibold text-center">{`${mode} your bug report`}</h2>

                <form className="create-form" onSubmit={mode === "Edit" ? handleEditSubmit : handleCreateSubmit}>
                    <label className="inline-block pb-2 text-base font-openSans">Title:</label>
                    <input
                        type="text"
                        className={`block w-full mb-4 p-3 rounded-md border bg-white ${emptyFields.includes('title') ? 'border-pinkred' : 'border-zinc-400'}`}
                        name="title"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="inline-block pb-2 text-base font-openSans">Description:</label>
                    <textarea
                        name="description"
                        className={`block w-full h-52 resize-y mb-4 p-3 rounded-md border bg-white ${emptyFields.includes('description') ? 'border-pinkred' : 'border-zinc-400'}`}
                        placeholder="Enter a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <section className="mb-4">
                        <button
                            type="submit"
                            className="inline-block px-3 py-2 mr-2 border border-darkerblue rounded-md bg-darkblue text-white text-base cursor-pointer transition-colors hover:bg-darkerblue"
                        >
                            Submit
                        </button>
                        <button
                            className="inline-block px-3 py-2 border border-pinkred rounded-md bg-pinkwhite text-pinkred text-base cursor-pointer transition-colors hover:bg-pinkred hover:text-pinkwhite"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </section>

                    {/* error container to display the error message */}
                    {error && <p className="p-4 border border-pinkred rounded-md text-pinkred bg-pinkwhite">{error}</p>}
                </form>
            </section>
        </div>
    )
}