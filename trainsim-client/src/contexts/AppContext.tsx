import Cart from "../models/Cart";
import React from "react";

export const appContextValues = {
    cart: new Cart(),
    updateContext: (_: Cart) => {}
};

export const AppContext = React.createContext(appContextValues);