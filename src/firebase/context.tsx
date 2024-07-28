'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, Auth, User } from 'firebase/auth';

import { signIn, signOut, auth } from '@/src/firebase/firebase';

interface ContextProps {
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    auth: Auth;
    user: User | null;
    loading: boolean;
}

const Context = createContext<ContextProps>({} as ContextProps);

export const AuthContextProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Context.Provider value={{ signIn, signOut, auth, user, loading }}>
            {children}
        </Context.Provider>
    );
};

export const useAuthContext = () => useContext(Context);
