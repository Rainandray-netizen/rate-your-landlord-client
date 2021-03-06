import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import './addReview.css'
import tokenService from '../../utils/tokenService'
import userService from '../../utils/userService'

const AddReview = () => {

  const [landlords, updateLandlords] = useState()
  if(!landlords){
    fetch('https://rate-your-landlord-server.herokuapp.com/landlords', {
      method:'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }).then(res => {
        if (res.ok) {
          (res.json()).then((endData)=>updateLandlords(endData))
        }else{
          throw new Error('something went wrong owo :3')
        }
      })
    }else{
      
    }

  const user = userService.getUser()

  const history = useHistory()

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    data.reviewerId = user._id

    return fetch('https://rate-your-landlord-server.herokuapp.com/reviews/', {
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
      history.push(`/landlord/${data.landlordId}`)
    })
  }

  if (landlords){
    return(
    
      <section className='form-container'>
        <form className='center-form' onSubmit={handleSubmit(onSubmit)} >
          <label> Rating (1-5):
            <input min='1' max='5' name='rating' type='number' ref={register({
              required:'Required',
              pattern: {
                value: /([^\s]*)/,
                message: 'Please fill in the form'
              }
            })} />
          </label>
          <label> Comments: 
            <textarea rows='8' cols='50' name='content' placeholder='Write your review here' ref={register({
              required:'Required',
              pattern: {
                value: /([^\s]*)/,
                message: 'Please fill in the form'
              }
            })} />
          </label>
          <label>Landlord: 
            <select name='landlordId' ref={register}>
              {landlords.map((landlord)=>
                <option value={landlord._id}>{landlord.name}</option>
              )}
            </select>
          </label>
          <input type='submit' />
        </form>
      </section>
    )
  }else{
    return(
      <div>
        LOADING LL
      </div>
    )
  }
  
}

export default AddReview