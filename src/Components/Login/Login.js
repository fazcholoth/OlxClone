 import {useContext, useState } from 'react';
import React from 'react';
import {FirebaseContext} from "../../store/Context";
import  Firebase  from "../../Firebase/config";
import { useHistory,Link } from "react-router-dom";
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const history=useHistory()
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const handlelogin=(e)=>{
    e.preventDefault()
    Firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
       history.push("/")                                                                                                                            
    }).catch((error)=>{
       alert(error.message)
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <>
              <Link to="/signup" style={{ cursor: 'pointer', color: 'black' }}>
                Signup
              </Link>
              <hr />
        </>
      </div>
    </div>
  );
}

export default Login;
