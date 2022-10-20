import React from "react";
import store, {ReduxStoreType} from "./redux/redux-store";
import {StoreType} from "./redux/store";

const StoreContext = React.createContext({} as ReduxStoreType);

type ProviderType = {
    store: ReduxStoreType
    children: React.ReactNode
}
//Provider пока можно не понимать
export const Provider = (props: ProviderType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContext;

