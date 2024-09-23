import React from 'react'
import './Container.scss'

function Container(props) {
  return (
    <div className='lg-container'>{props.children}</div>
  )
}

export default Container