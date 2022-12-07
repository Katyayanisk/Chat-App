import React, {useState, useEffect } from "react";
import {matchRoutes, useParams} from 'react-router-dom';
import Select from 'react-select'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
//import { ChatState } from "../Context/Provider";
//import { useContext } from 'react';

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../style/Chat.css";

function Chat(){

    const [search, setSearch] = useState("");
    const [loggedUser, setLoggedUser] = useState();
    const [allChats, setAllChats] = useState([]);
    const [currentUser, setCurrentuser] = useState("");
    



    //const { user } = ChatState();
    const [sidebarOpen, setSidebarOpen]=useState(false);
    const openSidebar=()=>{
      setSidebarOpen(false);
    };
    const closeSidebar=()=>{
      setSidebarOpen(false);
    };

    useEffect(() => {

        async function fetchChats(){
            const u = JSON.parse(localStorage.getItem('user'));

            if (u) {
                setLoggedUser(u);
                setCurrentuser(u.name);
            }
            const config = {
                headers: {
                  Authorization: `Bearer ${u.token}`,
                }
            }
            const { data } = await axios.get("http://127.0.0.1:5000/chat/", config);
            setAllChats(data)
            console.log(data);
        }
        fetchChats();
      }, []);
      
    
    const submitHandler = async ()=>{
        console.log(loggedUser);
        const config = {
            headers: {
              Authorization: `Bearer ${loggedUser.token}`,
            }
        }
        
        const { data } = await axios.get(`http://127.0.0.1:5000/user/${search}`,config);
        const body = {
            userid : data._id 
        }
        const { data2 } = await axios.post(`http://127.0.0.1:5000/chat/`, body, config);
        console.log(data);
    }

    

    const clickChat = (id,name) => {
        window.location = `/privatechat/${id}/${name}`;
    }

    const deleteChat = async(id) =>{
        const config = {
            headers: {
              Authorization: `Bearer ${loggedUser.token}`,
            }
        }
        const { data } = await axios.delete(`http://127.0.0.1:5000/chat/${id}`, config);
        window.location.reload(false);
    }

    const listItems = allChats.map((chat, id) => {
    return <li key={id} >
        {loggedUser._id==chat.users[0]._id && (<button  className="button_2" onClick={() => clickChat(chat._id,chat.users[1].name)}>{chat.users[1].name}</button>)}
        {loggedUser._id==chat.users[1]._id && (<button  className="button_2" onClick={() => clickChat(chat._id,chat.users[0].name)}>{chat.users[0].name}</button>)}
        
        <span onClick={() => deleteChat(chat._id)}><i class="fa-solid fa-xmark"></i></span>
        </li>
    
}

);

    return(
        <div className="chat">
        <div className="container">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
            {/* <h1>React App</h1> */}
            <span className="username">{currentUser}</span>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
            <div className="search_user">
                
            <form>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}></input>
                <button className='button_3' onClick={submitHandler}>Search</button>
            </form>
            </div>
            <div className="dm">
            <h1>Chats</h1>
            <br></br>
            <ul className="users">
                { listItems }
            </ul>
            </div>
            <div>
        </div>
        </div>
    </div>
        
    );
}
export default Chat;