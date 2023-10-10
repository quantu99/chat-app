import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        const ubsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });
        return () => {
            ubsub();
        };
    }, []);
    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
