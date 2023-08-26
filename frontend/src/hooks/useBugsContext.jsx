import { useContext } from 'react'
import { BugsContext } from '../contexts/bugsContext'

export default function useBugsContext() {
    const context = useContext(BugsContext);

    if (!context) throw Error('useBugsContext can only be used inside a BugsContextProvider!');

    return context;
}