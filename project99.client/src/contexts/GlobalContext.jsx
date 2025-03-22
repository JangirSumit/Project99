import { createContext, useReducer } from 'react';
import GlobalReducer from './GlobalReducer';

const initialState = {
    profile: {
        name: "",
        userName: "",
        role: 0,
        OrganizationId: 0
    },
    isAuthenticated: false
};

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalContextProvider };