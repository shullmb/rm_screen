import React from 'react';

export const CartItem = props => {
  let item = props.item

  return (
    <div className='cart-item'>
      <p>{item.name} | ${(item.price/100).toFixed(2)} </p>
    </div>
  )
  
}