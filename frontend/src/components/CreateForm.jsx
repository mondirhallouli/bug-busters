import { useState } from "react";
import useBugsContext from '../hooks/useBugsContext';
import useAuthContext from "../hooks/useAuthContext";

export default function CreateForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(null);
    const { dispatch } = useBugsContext();
    const { user } = useAuthContext();

    const handleSubmit = async (event) => {
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
            dispatch({ type: 'ADD-REPORT', payload: json })
        }
    };

    return (
        <div className="w-screen h-screen p-4 absolute top-0 left-0 flex flex-col justify-center items-center">
            <section className="w-full md:w-3/6 lg:w-2/5 shadow-lg border rounded-md mx-auto bg-white p-4">
                <h2 className="mb-7 text-darkblue text-xl font-semibold text-center">Create a new bug report</h2>

                <form className="create-form" onSubmit={handleSubmit}>
                    <label className="inline-block pb-2 text-base font-openSans">Title:</label>
                    <input
                        type="text"
                        className={`block w-full mb-4 p-3 rounded-md border border-zinc-400 bg-white ${emptyFields.includes('title') ? 'border-pinkred' : ''}`}
                        name="title"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="inline-block pb-2 text-base font-openSans">Description:</label>
                    <textarea
                        name="description"
                        className={`block w-full h-52 resize-y mb-4 p-3 rounded-md border border-zinc-400 bg-white ${emptyFields.includes('description') ? 'border-pinkred' : ''}`}
                        placeholder="Enter a description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <section className="mb-4">
                        <button type="submit" className="inline-block px-3 py-2 mr-2 border border-darkerblue rounded-md bg-darkblue text-white text-base cursor-pointer transition-colors hover:bg-darkerblue">Create</button>
                        <button className="inline-block px-3 py-2 border border-pinkred rounded-md bg-pinkwhite text-pinkred text-base cursor-pointer transition-colors hover:bg-pinkred hover:text-pinkwhite">Cancel</button>
                    </section>

                    {/* error container to display the error message */}
                    {error && <p className="p-4 border border-pinkred rounded-md text-pinkred bg-pinkwhite">{error}</p>}
                </form>
            </section>
        </div>
    )
}