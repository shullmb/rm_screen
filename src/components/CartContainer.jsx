import React from 'react';
import { CartItem } from './CartItem';
import { CartInfo } from './CartInfo';

const CartContainer = props => {
  let itemsInCart = props.items ? props.items.map( item => <CartItem key={item.itemId} item={item} />) : '';

  return (
    <aside id="cart">
      <h4>Your Cart</h4>
      {itemsInCart}
      <CartInfo />
    </aside>
  )
}

export default CartContainer;