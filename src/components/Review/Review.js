import React, {useState} from 'react'
import {
  Link,
  useParams,
  useHistory
} from 'react-router-dom'
import './review.css'
import tokenService from '../../utils/tokenService'
import { useForm } from 'react-hook-form'

const Review = (props) => {

  const { id } = useParams()
  const [review, updateState] = useState()
  if(!review){
    fetch(`https://rate-your-landlord-server.herokuapp.com/reviews/${id}`, {
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


  const history = useHistory()

  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    return fetch(`https://rate-your-landlord-server.herokuapp.com/reviews/${id}?_method=DELETE`, {
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
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(res => {
      if (res.ok) return res.json()
      throw new Error(res.error)
    }).then(()=>{
      history.push('/')
    })
  }

  if(review){
    return(
      <section className='review-wrapper-wrapper'>
        <div className='review-wrapper'>
          <div className='review-card'>
            <Link to={`/landlord/${review.landlordId._id}`}>{review.landlordId.name}</Link>
            <p>-{review.landlordId.propertyAddress}</p>
            <p>{review.rating}/5</p>
            <p>{review.content}</p>
              {props.userid === review.reviewerId ?
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type='submit' value='Delete'></input>
              </form>
              :
              <div />
              }
          </div>
        </div> 
      </section>
    )
  }else{
    return(
      <h1></h1>
    )
  }
  
}

export default Review