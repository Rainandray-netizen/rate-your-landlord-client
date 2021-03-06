import React, { useState } from 'react'
import {
  Link
} from 'react-router-dom'
import tokenService from '../../utils/tokenService'
import './feed.css'

const Feed = (props) => {
  const [state, updateState] = useState()
  if(!state){
    fetch('https://rate-your-landlord-server.herokuapp.com/reviews', {
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
          throw new Error('something went wrong owo :3')
        }
      })
    }
  

return(
  <section className='feed-container'>
    {state && state.map((review)=>{ 
      return(
        <div className='card' key={review._id} >
          <Link to={`/landlord/${review.landlordId._id}`}>{review.landlordId.name}</Link>
          <p>-{review.landlordId.propertyAddress}</p>
          <p>{review.rating}/5</p>
          <p>{review.content}</p>
          <Link to={`/review/${review._id}`}>Details</Link>
        </div>
      )    
    })}
  </section>
)

}

export default Feed