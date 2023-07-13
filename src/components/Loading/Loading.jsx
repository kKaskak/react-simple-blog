import React from 'react'
import { loading } from '../../constants/images'
import '../../App.css'
const Loading = () => {
  return (
    <div className='loading'>
        <img style={ window.innerWidth >= 650 ? {width: '15%', filter: 'invert(100)'} : { width: '35%',  filter: 'invert(100)' }} src={loading} alt="loading animation" />
    </div>
  )
}

export default Loading