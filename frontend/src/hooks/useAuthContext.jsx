import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function useAuthContext() {
    // set the context
    const context = useContext(AuthContext);

    // throw error if context is not correct
    if (!context) throw Error("useAuthContext hook can only be used inside the authContextProvider");

    // return context object
    return context;
}