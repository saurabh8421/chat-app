import React from 'react'

function Input({type, placeholder, name,onChange,value}) {
  return (
    //make reusable input field component
    <input type={type} placeholder={placeholder}  name={name} onChange={onChange} className='border-b-1 border-gray-600 p-1 m-4' />
  )
}

export default Input
