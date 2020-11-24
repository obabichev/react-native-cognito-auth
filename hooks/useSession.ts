import React from 'react';
import {useContext} from 'react';

const SessionContext = React.createContext<{ username: string | null, setUsername: (username: string | null) => void }>({
    username: null,
    setUsername: () => null
});

export const SessionProvider = SessionContext.Provider;

export const useSession = () => useContext(SessionContext);