import React from 'react';

export const CartHeader = ({numberOfItems}) => {
  var headerText = 'Your Cart is empty'
  if (numberOfItems > 1) {
    headerText = `${numberOfItems} Items in your Cart`
  } else if (numberOfItems === 1) {
    headerText = `1 Item in your Cart`
  } 
  
  return (
    <h4>{headerText}</h4>
  )
}