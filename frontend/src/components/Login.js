import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    
    
    const SubmitHandler = async () => {
        
        const body = {
            email: email,
            password: password
        }
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
        const { data } = await axios.post("http://127.0.0.1:5000/user/login",body,config);
        if (data){
            localStorage.setItem("user", JSON.stringify(data));
            window.location = "/chat";
        }
        else{
            console.log("data",data)
            const notify_message = () => toast("User not found");
            notify_message();
        }
        
    }

    return(
        <div className='landingpage_form'>
            <h1>Login</h1>
            <ToastContainer />
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="abc@xyz.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className='input_password'>
                    <label>Password</label>
                    <input type="password" placeholder="*******" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <button  className="button_3"onClick={SubmitHandler}>Login</button>
                
        </div>
    )
}
