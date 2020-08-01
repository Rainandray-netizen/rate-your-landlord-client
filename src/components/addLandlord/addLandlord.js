import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import './addLandlord.css'
import tokenService from '../../utils/tokenService'

const AddLandlord = () => {

  const history = useHistory()

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    return fetch('https://rate-your-landlord-server.herokuapp.com/landlords/', {
      method:'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res => {
      if (res.ok) return res.json()
      throw new Error(res.error)
    }).then(()=>{
      history.push('/')
    })
  }

  return(
    <section className='form-container'>
      <form className='center-form' onSubmit={handleSubmit(onSubmit)} >
        <input name='name' placeholder='Landlord Name' ref={register} />
        <input name='propertyAddress' placeholder='Property Address' ref={register} />
        <input type='submit' />
      </form>
    </section>
  )
}

export default AddLandlord