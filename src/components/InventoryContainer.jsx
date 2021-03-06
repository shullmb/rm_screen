import React from 'react';
import { InventoryItem } from './InventoryItem';


const InventoryContainer = ({items, addItem}) => {
  let itemsInStock = items ? items.filter( item => item.inStock)
    .map( item => <InventoryItem key={item.itemId} item={item} addItem={addItem} />) : <h3>Checking to see what's in stock...</h3>

  return (
    <div>
      <h1>Items in stock</h1>
      <div className="inventory">
        {itemsInStock}
      </div>
    </div>
  )
}

export default InventoryContainer;