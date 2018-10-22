import React from 'react';
import { CartItem } from './CartItem';
import { CartInfo } from './CartInfo';
import { CartHeader } from './CartHeader';

const CartContainer = props => {
  console.log(props)
  let itemsInCart = props.items ? props.items.map( item => <CartItem key={item.itemId} item={item} />) : ''
  let promoAmt = props.promo ? props.promo.promoAmt : 0
  let shipCost = props.shipping ? props.shipping.shipCost : 500
  return (
    <aside id="cart">
      <CartHeader numberOfItems={props.items.length} />
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