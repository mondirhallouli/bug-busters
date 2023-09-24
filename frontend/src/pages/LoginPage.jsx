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
        <div>
            <h2 className='font-inter text-darkerblue text-xl text-center font-semibold mb-16'>Login</h2>

            <form className='w-full sm:w-96 mx-auto' onSubmit={handleSubmit}>
                <label className='inline-block pb-2 text-base'>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full mb-4 p-3 border border-zinc-400 rounded-md bg-white text-base`}
                />

                <label className='inline-block pb-2 text-base'>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full mb-4 p-3 border border-zinc-400 rounded-md bg-white text-base`}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-block px-3 py-2 bg-darkblue border rounded-md border-darkerblue text-white transition-colors cursor-pointer hover:bg-darkerblue"
                >
                    Login
                </button>

                {error && <p className='text-base font-openSans text-pinkred bg-pinkwhite border border-pinkred p-4'>{error}</p>}
            </form>
        </div>
    )
}