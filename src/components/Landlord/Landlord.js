import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import './landlord.css'

const Landlord = () => {
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
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }).then(res => {
        if (res.ok) {
          (res.json()).then((endData)=>updateState(endData))
        }else{
          throw new Error('something went wrong owo :3')
        }
      })
  }

  console.log(state)

  return(
    <section className='landlord-wrapper'>
      <h1>{state && state.name}</h1>
      {state && state.reviews.map((review)=>{
        return(
          <div>
            <p>{review && review.userId.name}</p>
            <p>{review && review.content}</p>
          </div>
        ) 
      })}
    </section>
  )
}

export default Landlord