import React from 'react';
import axios from 'axios';
import "../style/Home.css";
import logo from "../assets/logo.png";


export default function Home(){

    return(
        <div className='landingpage'>
            <div >
                <img width='300'src={logo}></img>
                {/* <h1><b>Slack Logo</b></h1> */}
                <h1>Welcome!</h1>
                <div className='landing_buttons'>
                <a href="/register" role="button" className='button_1'>Register</a>
                <a href="/login" role="button"  className='button_2'>Login</a>
                </div>
            </div>
        </div>
    )
}
