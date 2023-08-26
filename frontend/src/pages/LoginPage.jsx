import { useState } from 'react';
import useLogin from '../hooks/useLogin';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loading, error } = useLogin();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await login(email, password);
    };

    return (
        <div className="login">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>Login</button>

                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}