import React from 'react';
import { CartItem } from './CartItem';
import { CartInfo } from './CartInfo';

const CartContainer = props => {
  console.log(props)
  let itemsInCart = props.items ? props.items.map( item => <CartItem key={item.itemId} item={item} />) : ''
  let promoAmt = props.promo ? props.promo.promoAmt : 0
  let shipCost = props.shipping ? props.shipping.shipCost : 500
  return (
    <aside id="cart">
      <h4>Your Cart</h4>
      {itemsInCart}
      <CartInfo 
        orderSubTotal={props.orderSubTotal} 
        selectedPromo={promoAmt} 
        selectedShipping={shipCost} 
      />
    </aside>
  )
}

export default CartContainer;