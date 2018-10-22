import React from 'react';
import Cart from './Cart';
import { CartItem } from './CartItem';
import { CartInfo } from './CartInfo';
import { CartHeader } from './CartHeader';
import { CartSelector } from './CartSelector';
import { Button } from './Button';

const CartContainer = props => {
  let itemsInCart = props.items ? props.items.map( (item,i) => <CartItem key={`${i}-${item.itemId}`} item={item} removeItem={props.removeItem} />) : ''
  let promoAmt = props.promo ? props.promo.promoAmt : 0
  let shipCost = props.shipping ? props.shipping.shipCost : 0

  return (
    <aside id="cart">
      <Cart >
        <CartHeader numberOfItems={props.items.length} />
        <CartSelector promos={props.promos} shipping={props.shippings}/>
        <CartInfo 
          orderSubTotal={props.orderSubTotal} 
          selectedPromo={promoAmt} 
          selectedShipping={shipCost} 
        />
        {itemsInCart}
        <Button text='checkout' />
      </Cart>
    </aside>
  )
}

export default CartContainer;