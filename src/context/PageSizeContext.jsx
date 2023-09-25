import { createContext, useState } from "react";

export const PageSizeProvider = createContext();

export const PageSizeContext = ({ children }) => {

    const [ pageSize, setPageSize ] = useState(20);

    const pageIncrement = ()=>{
        setPageSize(pageSize + pageSize);
    }

    return(
        <PageSizeProvider.Provider value={{ pageSize, pageIncrement }}>
            {children}
        </PageSizeProvider.Provider>
    )
};