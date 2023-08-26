import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state
    }
}

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    })

    useEffect(() => {
        // get the user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));

        // update the context if the user is set
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }

    }, []);

    console.log(state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}