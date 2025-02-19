import React from 'react'

function Button({type,color,text,name}) {
  return (
    <button type={type} style={{backgroundColor:color}} name={name} className='p-1 m-4 text-white shadow-sm'>
        {text}
    </button>
  )
}

export default Button
