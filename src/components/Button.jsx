import React from 'react';


export const Button = props => {
  const textValue = props.text
  const size = props.size ? `btn-${props.size}` : '';

  return (
    <div className={`btn ${size}`} onClick={props.onClick}>
      {textValue}
    </div>
  )
}