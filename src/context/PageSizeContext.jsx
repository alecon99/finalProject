import { createContext, useState } from "react";

export const PageSizeProvider = createContext();

export const PageSizeContext = ({ children }) => {

    const [ pageSize, setPageSize ] = useState(24);

    const pageIncrement = ()=>{
        setPageSize(pageSize + 24)
    }

    return(
        <PageSizeProvider.Provider value={{ pageSize, pageIncrement }}>
            {children}
        </PageSizeProvider.Provider>
    )

};