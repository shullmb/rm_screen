import React from 'react';
import { Button } from './Button';
import { formatUSD } from '../helpers/formatter';
import { Thumbnail } from './Thumbnail';

export const InventoryItem = ({item, addItem}) => {
  // assign random thumbnail query string for img from unsplash
  const qsArr = ['snow','castle','wolf','iceland','aurora'];
  let qs = qsArr[Math.floor(Math.random() * qsArr.length)];

  // handle addItem click 
  function handleClick(e) {
    e.stopPropagation()
    addItem(item)
  }

  return (
    <div className='module inventory-item'>
      <div className="inv-content">
        <div>
          <Thumbnail />
        </div>
        <div>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>
            <span className="text-bold">${formatUSD(item.price)}</span>
            <span className='small'>&nbsp; {item.itemId.toLowerCase()}</span> 
          </p>
        </div>
      </div>
      <Button text={'add to cart'} onClick={handleClick}/>
    </div>
  )
}