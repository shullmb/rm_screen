import React from 'react';
import { formatUSD } from '../helpers/formatter';

export const CartItem = props => {
  let item = props.item

  return (
    <div className='cart-module'>
      <p>{item.name} | ${formatUSD(item.price)} </p>
    </div>
  )
  
}