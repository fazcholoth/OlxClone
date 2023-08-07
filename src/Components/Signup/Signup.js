import React, { useState ,useContext} from 'react';
import {FirebaseContext} from "../../store/Context";
import Logo from '../../olx-logo.png';
import './Signup.css';
import  Firebase   from "../../Firebase/config";
import { useHistory ,Link} from "react-router-dom";

export default function Signup() {
  const history=useHistory()
  const [username,setusername]=useState('')
  const [email,setemail]=useState('')
  const [phonenumber,setphonenumber]=useState('')
  const [password,setpassword]=useState('')
  const {Firebase}=useContext(FirebaseContext)
  
  const handlesubmit=(e)=>{
    e.preventDefault()
    Firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        Firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phonenumber,
          email:email
        }).then(()=>{
           history.push("/login")
        })
      })
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form  onSubmit={handlesubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            
            onChange={(e)=>{setusername(e.target.value)}}
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            
            value={phonenumber}
            onChange={(e)=>{setphonenumber(e.target.value)}}
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
          <button>Signup</button>
        </form>
        <>
              <Link to="/login" style={{ cursor: 'pointer', color: 'black' }}>
                Login
              </Link>
              <hr />
         </>
      </div>
    </div>
  );
}
