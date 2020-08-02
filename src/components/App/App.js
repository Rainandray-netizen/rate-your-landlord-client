import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Feed from '../Feed/Feed'
import Landing from '../Landing/Landing'
import Landlord from '../Landlord/Landlord'
import AddLandlord from '../addLandlord/addLandlord'
import AddReview from '../addReview/AddReview'
import Review from '../Review/Review'

import userService from "../../utils/userService";




function App() {
  const [ user, updateUser ] = useState(userService.getUser())

  const handleUpdateUser = () => {
    if(!user){
      const theUser = userService.getUser()
      updateUser(theUser)
    }else{
    }
  }

  const handleLogout = () => {
    userService.logout();
    updateUser(null);
  }

  return (
    <Router>
        {user ? 
        <div>
          <nav className='nav-bar'>
            <Link className='pageheader' to='/'>Rate Your Landlord</Link>
            <h1 className='pageheader'>Welcome, {user.name }</h1>
            <Link className='navlink' to='/review/new'>New Review</Link>
            <Link className = 'navlink' to='/landlord/new'>New Landlord</Link>
            <Link className='navlink' to='' onClick={handleLogout}>Log Out</Link>
          </nav>
          
        </div>
          :
        <div>
          <nav className='nav-bar' >
            <Link className='pageheader' to='/'>Rate Your Landlord</Link>
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

        <Route exact path='/landlord/new' render={() => (
          userService.getUser() ?
          <AddLandlord />
   	      :
          <Redirect to='/login' />
          )}/>
        <Route exact path='/landlord/:id' render={() => (
          userService.getUser() ?
          <Landlord />
   	      :
          <Redirect to='/login' />
          )}/>
        <Route exact path='/review/new' render={() => (
          userService.getUser() ?
          <AddReview />
   	      :
          <Redirect to='/login' />
          )}/>
        <Route exact path='/review/:id' render={() => (
          userService.getUser() ?
          <Review userid={user._id} />
   	      :
          <Redirect to='/login' />
          )}/>
      </Switch>
    </Router>
  );
}

export default App;
