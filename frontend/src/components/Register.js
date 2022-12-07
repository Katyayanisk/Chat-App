import React from 'react';
import axios from 'axios';
import "../style/Home.css";
import { useState } from 'react'


export default function Register(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    
    
    const SubmitHandler = async () => {
        
        const body = {
            email: email,
            password: password,
            name: name
        }
        const { data } = await axios.post("http://127.0.0.1:5000/user/",body);
        if (!data){
            const notify_message = () => toast("User not found");
            notify_message();
        }
        else{
        window.location = "/login";
        }
    }

    return(
        <div className='landingpage_form'>
            <h1>Register</h1>
                <div>
                    <label>Email</label>
                    <input type="email"  placeholder="abc@xyz.com" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="John" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className='input_password'>
                    <label>Password</label>
                    <input type="password" placeholder="*******" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button onClick={SubmitHandler} className='button_3'>Register</button>
        </div>
            
    )
}
