import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

import "../style/PrivateChat.css";


export default function PrivateChat() {

    const { chatId, chat } = useParams();
    console.log(chatId);
    const [loggedUser, setLoggedUser] = useState();
    const [messages, setMessages] = useState([]);
    //const [title, setTitle] = useState([]);
    const [content, setContent] = useState("");


    useEffect(() => {

        async function fetchMessages(){
            const u = JSON.parse(localStorage.getItem("user"));

            if (u) {
                setLoggedUser(u);
            }
            console.log(u.token);
            const config = {
                headers: {
                  Authorization: `Bearer ${u.token}`,
                }
            }
            console.log(config);
            const { data } = await axios.get(`http://127.0.0.1:5000/message/${chatId}`, config);
            setMessages(data);
        }
        fetchMessages();
      }, []);

      const sendMessage = async ()=>{
        const body = {
            chatId: chatId,
            content: content
        }
        const config = {
            headers: {
              Authorization: `Bearer ${loggedUser.token}`,
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:5000/message/`, body, config);
        setMessages([...messages,data]);
        setContent("");

      }

    return(
      <div className='username'>
        <h2>{chat}</h2>
        <div className='private_chat'>
          
          
        {/* <input className="mb-3">
        <Form.Control aria-describedby="basic-addon2" value={content} onChange={e => setContent(e.target.value)}/>
        <Button variant="outline-secondary" onClick={sendMessage} id="button-addon2">
          Send
        </Button>
      </input> */}
      {/* <ListGroup className='message'> */}
      <ul>
        {messages.map((mess,id)=>{
            return <div>
              <li className="texting" style={{ backgroundColor: mess.sender._id==loggedUser._id?"#400c44":"#e9e9eb" ,color:mess.sender._id==loggedUser._id?"white":"black", marginLeft:mess.sender._id==loggedUser._id?"30rem":"0"}} key={id}>
                {mess.content}
            </li>
            <br></br>
            </div>
        })
        }
        </ul>
      {/* </ListGroup> */}
      {/* <InputGroup className="p_chat"> */}
        <input type="text"  value={content} onChange={e => setContent(e.target.value)}/>
        <button className="button_3"  onClick={sendMessage} id="button-addon2">
          Send
        </button>
      {/* </InputGroup> */}
      </div>
      </div>
    )

}