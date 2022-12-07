import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
//import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({props}) => {

    const [user,setUser] = useState();

    useEffect(()=>{
        const logg = JSON.parse(localStorage.getItem("user"));
        setUser(logg);
    },[])
   
 return(
        <ChatContext.Provider value={{user, setUser}}>
            {props}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
