import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import PrivateChat from './components/PrivateChat';
import ChatProvider from './Context/Provider';

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import React, {useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/privatechat/:chatId/:chat" element={<PrivateChat />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
