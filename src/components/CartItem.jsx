import React from 'react';
import { formatUSD } from '../helpers/formatter';
import { Button } from './Button';

export const CartItem = ({item, removeItem}) => {
  
  // handle removeItem click
  function handleClick() {
    removeItem(item)
  }

  return (
    <div className='module cart-item'>
      <p>1 - {item.name} @ ${formatUSD(item.price)} </p>
      <Button text={'X'} size='sm' onClick={handleClick} />
    </div>
  )
  
}