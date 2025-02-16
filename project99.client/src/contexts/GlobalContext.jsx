import { createContext, useReducer } from 'react';
import { reducer } from '../reducers/reducer';

const initialState = {};

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalContextProvider };