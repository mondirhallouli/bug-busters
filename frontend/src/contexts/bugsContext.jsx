import { createContext, useReducer } from 'react';

export const BugsContext = createContext();

function bugsReducer(state, action) {
    switch (action.type) {
        case 'SET-REPORTS':
            return {
                reports: action.payload
            }
        case 'ADD-REPORT':
            return {
                reports: [action.payload, ...state.reports]
            }
        case 'DELETE-REPORT':
            return {
                reports: state.reports.filter(report => report._id !== action.payload._id),
            }
        default:
            return state;
    }
}

export default function BugsContextProvider({ children }) {
    const [state, dispatch] = useReducer(bugsReducer, {
        reports: null,
    })

    return (
        <BugsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BugsContext.Provider>
    );
};