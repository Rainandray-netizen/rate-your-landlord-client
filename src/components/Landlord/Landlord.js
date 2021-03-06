import React, { useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import tokenService from '../../utils/tokenService'

import './landlord.css'

const Landlord = () => {
  const history = useHistory()
  const { id } = useParams()
  const [state, updateState] = useState()
  if(!state){
    fetch(`https://rate-your-landlord-server.herokuapp.com/landlords/${id}`, {
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
          (res.json()).then((endData)=>updateState(endData))
        }else{
          history.push('/')
        }
      })
  }

  return(
    <section className='landlord-wrapper-wrapper'>
      <h1>{state && state.name}</h1>
      <div className='landlord-wrapper'>
      {state && state.reviews.map((review)=>{
        return(
          <div className='review-card'>
            <p>{review && review.reviewerId.name}</p>
            <p>"{review && review.content}"</p>
            <p>{review && review.rating}/5</p>
          </div>
        ) 
      })}
      </div>
      
    </section>
  )
}

export default Landlord