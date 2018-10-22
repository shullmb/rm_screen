import React from 'react';
import { Button } from './Button';
import { formatUSD } from '../helpers/formatter';

export const InventoryItem = ({item, addItem}) => {
  // assign random thumbnail query string for img from unsplash
  const qsArr = ['snow','castle','wolf','iceland','aurora'];
  let qs = qsArr[Math.floor(Math.random() * qsArr.length)];

  // handle click 
  function handleClick(e) {
    e.preventDefault()
    addItem(item)
  }

  return (
    <div className='module inventory-item'>
      <div className="inv-content">
        <div>
          <img className='inv-img' src={`https://source.unsplash.com/200x200/?${qs}`} alt="{qs}"/>
        </div>
        <div>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      </div>
      <Button text={`add to cart - $ ${formatUSD(item.price)}`} onClick={handleClick}/>
    </div>
  )
}