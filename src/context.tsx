import React, { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext(null);

interface ProviderProps {
    children: React.ReactNode
}

const AppProvider = ({ children }: ProviderProps) => {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        console.log('context effect')
        if (localStorage.getItem('isAuth') === 'true') {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    return (
        <AppContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);
export { AppContext, AppProvider }
