import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import Loader from '../components/Loader';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loading, error } = useLogin();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await login(email, password);
    };

    const handleDemo = async (evt) => {
        evt.preventDefault();

        await login(import.meta.env.VITE_DEMO_USER_EMAIL, import.meta.env.VITE_DEMO_USER_PASSWORD)
    }

    return (
        <div>
            <h2 className='font-inter text-darkerblue text-xl text-center font-semibold mb-16'>Login</h2>

            {!loading && (
                <form className='w-full sm:w-96 mx-auto mb-20' onSubmit={handleSubmit}>
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
                        className="block px-3 py-2 mx-auto mb-4 bg-darkblue border rounded-md border-darkerblue text-white transition-colors cursor-pointer hover:bg-darkerblue"
                    >
                        {
                            loading ? 'Signing in...' : 'Sign in'
                        }
                    </button>

                    <button className='block px-6 py-4 text-2xl text-center bg-transparent rounded-md border border-darkgray text-darkgray mx-auto transition-colors cursor-pointer hover:bg-darkgray hover:text-white' onClick={handleDemo}>
                        Demo User
                    </button>

                    {error && <p className='text-base font-openSans text-pinkred bg-pinkwhite border border-pinkred p-4'>{error}</p>}
                </form>
            )}
            {loading && <Loader />}
        </div >
    )
}