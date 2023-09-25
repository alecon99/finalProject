import { createContext } from "react";

export const ShippingCostProvider = createContext();

export const ShippingCostContext = ({ children }) => {

    const standardShippingCost = 9.9;
    const priorityShippingCost = 14.9;
    const freeShipping = 50;

    return(
        <ShippingCostProvider.Provider value={{ standardShippingCost, priorityShippingCost, freeShipping }}>
            {children}
        </ShippingCostProvider.Provider>
    )

};