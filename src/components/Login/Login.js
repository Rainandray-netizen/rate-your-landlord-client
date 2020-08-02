import React from 'react'
import { useForm } from 'react-hook-form'
import tokenService from '../../utils/tokenService'
import { useHistory } from 'react-router-dom'

import './login.css'

const Login = (props) => {
  const history = useHistory()

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    return fetch('https://rate-your-landlord-server.herokuapp.com/users/login', {
      method:'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res => {
      if (res.ok) {return res.json()} else {return {}}
    }).then((tokenContainer) => {

      if ( tokenContainer.token ) {
        tokenService.setToken(tokenContainer.token)
      }else{
        
      }

    }).then(()=>
       props.handleUpdateUser()
    ).then(()=>{
      history.push('/')
      }
    )
  }

  return(
    <section className='form-container'>
      <h1>Log In</h1>
      <form className='center-form' onSubmit={handleSubmit(onSubmit)} >
        <label>Username: 
          <input name='name' placeholder='Username' ref={register({
            required:'Required',
            pattern: {
              value: /([^\s]*)/,
              message: 'Please fill in the form'
            }
          })} />
        </label>
        <label>Password: 
          <input name='password' type='password' placeholder='Password' ref={register({
            required:'Required',
            pattern: {
              value: /([^\s]*)/,
              message: 'Please fill in the form'
            }
          })} />
        </label>
        <input type='submit' value='Login' />
      </form>
    </section>
  )
}

export default Login