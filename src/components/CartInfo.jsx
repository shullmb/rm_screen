import React from 'react';
import { formatUSD } from '../helpers/formatter'

export const CartInfo = props => {
  const orderSubTotal = props.orderSubTotal // cents
  const selectedPromo = props.selectedPromo // whole dollar
  const selectedShipping = props.selectedShipping // cents
  // apply tax, promo and shipping
  const orderTotal = 1.10 * ((orderSubTotal + selectedShipping) - selectedPromo * 100)

  return (
    <div className='module'>
      <p>Order Subtotal: ${formatUSD(orderSubTotal)}</p>
      <p>Promo: -${formatUSD(selectedPromo, 'I')}</p>
      <p>Shipping: ${formatUSD(selectedShipping)}</p>
      <p>Tax: 10% </p>
      <h5>Order Total: ${formatUSD(orderTotal)}</h5>
    </div>
  )
  
}