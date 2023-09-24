import { useState } from "react";
// hooks
import useSignup from "../hooks/useSignup"

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup, loading, error } = useSignup();

    const handleSubmit = async (evt) => {
        // evt.preventDefault();

        await signup(username, email, password);
    };

    return (
        <div>
            <h2 className="font-inter text-darkerblue text-xl text-center font-semibold mb-16">Sign up</h2>

            <form className="w-full sm:w-96 mx-auto" onSubmit={handleSubmit}>
                <label className="inline-block pb-2 text-base">Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={`block w-full mb-4 p-3 border border-zinc-400 rounded-md bg-white text-base`}
                />

                <label className="inline-block pb-2 text-base">Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={`block w-full mb-4 p-3 border border-zinc-400 rounded-md bg-white text-base`}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={`block w-full mb-4 p-3 border border-zinc-400 rounded-md bg-white text-base`}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-block px-3 py-2 bg-darkblue border rounded-md border-darkerblue text-white transition-colors cursor-pointer hover:bg-darkerblue"
                >
                    Sign up
                </button>

                {error && <p className="text-base font-openSans text-pinkred bg-pinkwhite border border-pinkred p-4">{error}</p>}
            </form>
        </div>
    )
}