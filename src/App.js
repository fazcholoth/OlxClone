import React ,{useEffect,useContext,useState} from 'react';
import './App.css';                                                          
import { BrowserRouter as Router,Route } from "react-router-dom";
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import {FirebaseContext,AuthContext} from "./store/Context"
import Create from './Pages/Create';   
import ViewPost from './store/PostContext'; 
import View from './Pages/ViewPost';                  
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';



function App() {
  const {setuser}=useContext(AuthContext)
  const{Firebase}=useContext(FirebaseContext)
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user)=>{
      setuser(user)
    })                                                                                   
  },[])                                                   
  

  return (
    <div>
      <ViewPost>
      <Router>
        <Route exact path="/" >
         <Home />
        </Route>
        <Route path="/signup" >
         <Signup />
        </Route>
        <Route path='/login'>
            <Login />
        </Route>
        <Route path='/create'>
          <Create />
        </Route>
        <Route path='/view'>
          <View />
        </Route>
      </Router>
      </ViewPost>
    </div>
  );
}
export default  App;                                                                                                                                                                                                                        