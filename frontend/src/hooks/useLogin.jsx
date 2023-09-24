import { useState } from "react";
import useAuthContext from "./useAuthContext";

function useLogin() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        // set the loading state
        setLoading(true);
        // reset the error state
        setError(null);

        // get the login info
        const data = { email, password };

        // send a post request
        const response = await fetch(`${import.meta.env.VITE_USER_API_URL}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({ type: "LOGIN", payload: json });
            setLoading(false);
        }
    }

    // return the states and the login function
    return { login, loading, error };
}

export default useLogin;