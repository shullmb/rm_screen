import React from 'react';
import { formatUSD } from '../helpers/formatter'

export const CartInfo = props => {
  const orderSubTotal = formatUSD(props.orderSubTotal)
  const selectedPromo = formatUSD(props.selectedPromo,'I')
  const selectedShipping = formatUSD(props.selectedShipping)

  console.log(typeof selectedShipping)


  return (
    <div className='cart-module'>
      <p>Order Subtotal: {orderSubTotal}</p>
      <p>Promo: -{selectedPromo}</p>
      <p>Shipping: {selectedShipping}</p>
      <h5>Order Total: {(orderSubTotal - selectedPromo) + selectedShipping}</h5>
    </div>
  )
  
}