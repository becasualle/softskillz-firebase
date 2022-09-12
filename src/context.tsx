import React, { useContext, createContext, useState } from "react";

const AppContext = createContext(null);

interface Props {
    children: React.ReactNode
}

const AppProvider = ({ children }: Props) => {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <AppContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);
export { AppContext, AppProvider }
