import React from 'react'
import { loading } from '../../constants/images'
const Loading = () => {
  return (
    <div className='loading'>
        <img src={loading} alt="loading animation" />
    </div>
  )
}

export default Loading