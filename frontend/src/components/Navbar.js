import "../style/Navbar.css";
import logo from "../assets/logo.png";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import React, {useState, useEffect } from "react";

function Navbar({sidebarOpen,openSidebar}){

    const [loggedUser, setLoggedUser] = useState("");

    const logout = ()=>{
        const u = JSON.parse(localStorage.getItem('user'));

        localStorage.removeItem("user");
        window.location = "/";
        
        
    }

    return(
        // <div className="navigation">
        <nav className="navbar">
            <div className="nav_icon" onClick={()=> openSidebar()}>

                {/* <i className="fa fa-bars"></i> */}
            </div>
            <div className="navbar__left">
                {/* <div className="search_wrapper">
                        <input type="search" id="search" placeholder="Search MERN Project"></input>
                        <a href="/logout">
                        <i className="fa fa-search"></i>
                    </a>
                </div> */}
            </div>
            <div className="navbar__right">
                <a href="#">
                <i className="fa fa-circle-question"></i>
                <span onClick={logout}><i class="fa-solid fa-power-off"></i></span>
                    {/* <HelpOutlineIcon style={{color:"#a5aaad" }}></HelpOutlineIcon> */}
                </a>
                <a href="#">
                    <img width="120" src={logo} />
                </a>
            </div>
        </nav>
    // </div>
    )
}

export default Navbar;