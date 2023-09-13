import { createContext, useState } from "react";

export const SelectedProductProvider = createContext();

export const SelectedProductContex = ({ children }) => {

    const [ selected, setSelected ] = useState({});

    return(
        <SelectedProductProvider.Provider value={{ selected, setSelected }}>
            {children}
        </SelectedProductProvider.Provider>
    )

};