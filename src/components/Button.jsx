import React from 'react';


export const Button = props => {
  const textValue = props.text

  return (
    <div className='btn' onClick={props.onClick}>
      {textValue}
    </div>
  )
}