import React from 'react';
import { Button } from './Button';
import { formatUSD } from '../helpers/formatter';

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
          <img className='inv-img' src={`https://source.unsplash.com/100x100/?${qs}`} alt="{qs}"/>
        </div>
        <div>
          <h2>{item.name}</h2>
          <p className='small'>{item.itemId}</p>
          <p>{item.description}</p>
          <p><span className="text-bold">${formatUSD(item.price)}</span></p>
        </div>
      </div>
      <Button text={'add to cart'} onClick={handleClick}/>
    </div>
  )
}