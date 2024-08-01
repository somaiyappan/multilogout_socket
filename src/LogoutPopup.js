import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { viewLogoutPopup } from './redux/slice/logoutPopupSlice';
import io from 'socket.io-client';
export default function LogoutPopup() {
    const navigate = useNavigate()



    const [popup, setPopup] = useState(false)

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(viewLogoutPopup({ view: false }));
        navigate("/");
        setPopup(false)
    };


    var token = localStorage.getItem("token")
    var email = localStorage.getItem("email")



    const onExpire = () => {
        if (token !== null) {
            setPopup(true)
            localStorage.clear()
        }

    };

    useEffect(() => {
        let timerRef = null;
        if (token) {

            const decoded = jwtDecode(token);
            console.log(decoded)
            const expiryTime = (new Date(decoded.exp * 1000)).getTime();
            const currentTime = (new Date()).getTime();
            const timeout = expiryTime - currentTime;
            if (timeout > 0) {
                // token not expired, set future timeout to log out and redirect
                timerRef = setTimeout(onExpire, timeout);
            } else {
                // token expired, log out and redirect
                onExpire();
            }

            // Clear any running timers on component unmount or token state change
            return () => {
                clearTimeout(timerRef);
                socket.close();
            };

        }
    }, [token]);

    const socket = io('http://localhost:5000');


    socket.on('connect', () => {
        console.log('Connected to the server');
    });


    useEffect(() => {
        
        if (email) {
          socket.emit('joinRoom', email);
          socket.on('tokenUpdate', (newToken) => {
            if (newToken !== token) {
              onExpire();
            }
          });
        }
    
        return () => {
          socket.off('tokenUpdate');
        };
      }, [email, token]);






    return (
        <div>
            {
                popup ?
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", }} >
                        <div style={{ background: "white", height: 150, width: 240, margin: "auto", padding: "2%", border: "2px solid #000", borderRadius: "10px", boxShadow: "2px solid black", }} >

                            <button type="button" onClick={handleClose}>
                                Session Expired
                            </button>

                        </div>
                    </div> : null
            }
        </div>
    )
}
