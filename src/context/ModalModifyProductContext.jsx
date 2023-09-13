import { createContext, useState } from "react";

export const ModalModifyProvider = createContext();

export const ModalModifyContex = ({ children }) => {

    const [show, setShow] = useState(false);

    return(
        <ModalModifyProvider.Provider value={{ show, setShow }}>
            {children}
        </ModalModifyProvider.Provider>
    )

};