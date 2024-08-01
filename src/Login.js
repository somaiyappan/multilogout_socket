import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client"

function Login() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {

        if (userName !== "" && password !== "") {
            var postData = { email: userName, password }
            axios.post('http://localhost:5000/api/user/login', postData).then((res) => {
                if (res.data.token) {
                    navigate("/welcome")
                    console.log(res.data.token)
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("email", userName)


                    var socket = io('http://localhost:5000');
                    socket.emit('joinRoom', userName);

                    socket.emit('tokenUpdate', userName, res.data.token)

                }
                else {
                    alert(res.data.message)
                }

            })
        }
        else {
            alert("Please Fill Email & Password")
        }

    }



    return (
        <>
            <input onChange={(e) => { setUserName(e.target.value) }} ></input>
            <input onChange={(e) => { setPassword(e.target.value) }}></input>
            <button onClick={() => handleLogin()}>Login</button>
        </>
    );
}

export default Login;



