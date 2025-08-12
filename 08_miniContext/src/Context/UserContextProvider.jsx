import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) =>{                         // children means any React elements/components wrapped inside this provider.
    const [user, setUser] = React.useState(null)
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;