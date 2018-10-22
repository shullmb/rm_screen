import React from 'react';
import { formatUSD } from '../helpers/formatter';
import { Button } from './Button';

export const CartItem = ({item, removeItem}) => {
  
  // handle removeItem click
  function handleClick(e) {
    e.preventDefault()
    removeItem(item)
  }

  return (
    <div className='module'>
      <p>{item.name} | ${formatUSD(item.price)} </p>
      <Button text={'X'} onClick={handleClick} />
    </div>
  )
  
}