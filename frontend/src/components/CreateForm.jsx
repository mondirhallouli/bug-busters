import { useState } from "react";
import useBugsContext from '../hooks/useBugsContext';

export default function CreateForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(null);
    const { dispatch } = useBugsContext();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // save the body data in an object
        const data = { title, description };

        // send a post request to the server
        const response = await fetch('http://localhost:3000/api/bugs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
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
        <div className="create">
            <h2>Create a new bug report</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    className={emptyFields.includes('title') ? 'error' : ''}
                    name="title"
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    className={emptyFields.includes('description') ? 'error' : ''}
                    placeholder="Enter a description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Create</button>

                {/* error container to display the error message */}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}