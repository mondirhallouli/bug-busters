import useAuthContext from "./useAuthContext";

export default function useLogout() {
    const { dispatch } = useAuthContext();
    const logout = () => {
        // delete the user entry from the local storage
        localStorage.removeItem('user');
        // dispatch an action to update the auth context
        dispatch({ type: "LOGOUT" });
    }

    // return the logout function
    return { logout };
}