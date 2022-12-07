import "../style/Sidebar.css";
import AddIcon from '@mui/icons-material/Add';

// import db from './database/db';
// import {useState} from 'react';
// import {useEffect} from 'react';
// import React from "react";



function Sidebar ({sidebarOpen,closeSidebar}){


    // const[channels,setChannels]=useState([]);

    // useEffect(()=>{
    //     db.collection('AddChannels').onSnapshot((snapshot) => {
    //         setChannels(
    //             snapshot.docs.map((doc => ({
    //                 id: doc.id,
    //                 name:doc.data().name,
    //             }))
    //         ))
    //     });

    // },[]);

    return(
        <div className={sidebarOpen ? "sidebar-responsive": ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                {/* <i className="fa-regular fa-clock"></i> */}
                </div>
                <i className="fa fa-times" id="sidebarIcon" onClick={()=> closeSidebar()}></i>
            </div>
            <div className="sidebar__menu">
                <div className="sidebar__link organisation__name">
                    <h2>Messenger</h2>
                    <p>If you have any questions or queries feel free to contact us by telephone or email and we 
                        will be sure to get back to you as soon as possible
                        <br></br>
                        Phone: +918399382735
                        <br></br>
                        Email: messangerapp@gmail.com
                    </p>
                </div>


                {/* <h2>Channels</h2>
                <SidebarOption title="General"/>
                <SidebarOption title="Random"/>
                <SidebarOption Icon= {AddIcon} addChannelOption title="Add Channels"/>
                <hr/>
                <h2>Direct Messages</h2>
                <SidebarOption title="Person 1"/>
                <SidebarOption title="Person 2"/> */}



                {/* connection to db */}

                {/* {channels.map(channel =>(
                    <SidebarOption title={channel.name} id={channel.id} />
                ))} */}

            </div>
        </div>

    );
 };

export default Sidebar;
