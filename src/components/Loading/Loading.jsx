import React from 'react'
import { loading } from '../../constants/images'
const Loading = () => {
  return (
    <div className='loading' style={{display: 'flex', backgroundColor: '#fff', width: '100vw', height: '93vh', justifyContent: 'center', alignItems: 'center', padding: '1rem'}}>
        <img style={ window.innerWidth >= 650 ? {width: '15%', filter: 'invert(100)'} : { width: '35%',  filter: 'invert(100)' }} src={loading} alt="loading animation" />
    </div>
  )
}

export default Loading