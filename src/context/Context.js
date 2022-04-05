import { createContext, useEffect, useReducer } from "react";
import aReducer from "./Reducer.js";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
}

export const aContext = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(aReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <aContext.Provider
        value={{
            user: state.user,
            isFetching: state.isFetching,
            error:state.error,
            dispatch,
        }} >
            {children}
        </aContext.Provider>
    )
}