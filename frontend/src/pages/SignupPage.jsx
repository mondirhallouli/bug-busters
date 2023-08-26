import { useState } from "react";
// hooks
import useSignup from "../hooks/useSignup"

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup, loading, error } = useSignup();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await signup(username, email, password);
    };

    return (
        <div className="signup">
            <h2>Sign up</h2>

            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button type="submit" disabled={loading}>Signup</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}