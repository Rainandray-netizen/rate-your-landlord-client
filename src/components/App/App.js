import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.css';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Feed from '../Feed/Feed'
import Landing from '../Landing/Landing'
import Landlord from '../Landlord/Landlord'

import userService from "../../utils/userService";




function App() {
  console.log('app rerender')
  const [ user, updateUser ] = useState(userService.getUser())

  const handleUpdateUser = () => {
    console.log('handleupdate user called')
    if(!user){
      const theUser = userService.getUser()
      console.log('theUser: ',theUser)
      updateUser(theUser)
    }else{
      console.log('already have a user')
    }
  }

  const handleLogout = () => {
    userService.logout();
    updateUser(null);
  }

  if(user){
    console.log('user found: ', user)
  }else{
    console.log('no user')
  }

  return (
    <Router>
        {user ? 
        <div>
          <nav className='nav-bar'>
            <h1 className='navlink' >Rate Your Landlord</h1>
            <h1 className='navlink'>Welcome, {user.name }</h1>
            <Link className='navlink' to='' onClick={handleLogout}>Log Out</Link>
          </nav>
          
        </div>
          :
        <div>
          <nav className='nav-bar' >
            <h1 className='navlink' >Rate Your Landlord</h1>
            <Link className='navlink' to='/login' >Login</Link>
            <Link className='navlink' to='/signup' >Sign Up</Link>
          </nav>
        </div>
        }
      <Switch>
        <Route exact path='/'>
          {!user ? <Landing /> : <Feed />}
        </Route>
        <Route exact path='/login'>
          <Login handleUpdateUser={handleUpdateUser} />
        </Route>
        <Route exact path='/signup'>
          <Signup className='center-form' handleUpdateUser={handleUpdateUser}/> 
        </Route>
        <Route path='/landlord/:id'>
          <Landlord />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
