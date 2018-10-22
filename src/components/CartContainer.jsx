import React from 'react';
import { CartItem } from './CartItem';
import { CartInfo } from './CartInfo';
import { CartHeader } from './CartHeader';
import { CartSelector } from './CartSelector';
import { Button } from './Button';

const CartContainer = props => {
  let user = props.user
  let itemsInCart = props.items ? props.items.map( (item,i) => (
      <CartItem key={`${i}-${item.itemId}`} 
        item={item} 
        removeItem={props.removeItem} 
      />
    )
  ) : ''

  let shipCost = props.shipping ? props.shipping.shipCost : 0
  let promoAmt;

  if (!props.promo) {
    promoAmt = 0
  } else {
    if (props.promo.promotionName.includes('Percentage')) {
      promoAmt = props.orderSubTotal * (props.promo.promoAmt / 10000 ) // divide by 10000 to account for conversion
      console.log({ promoAmt})
    } else {
      promoAmt = props.promo.promoAmt
    }
  }

  return (
    <aside id="cart">
      <CartHeader numberOfItems={props.items.length} user={user} />
      <CartSelector 
        orderSubTotal={props.orderSubTotal}
        promos={props.promos} 
        promoAmt={promoAmt} 
        shipping={props.shippings}
        updatePromo={props.updatePromoSelection}
        updateShipping={props.updateShippingSelection}
      />
      <CartInfo 
        orderSubTotal={props.orderSubTotal} 
        selectedPromo={promoAmt} 
        selectedShipping={shipCost} 
      />
      {itemsInCart}
      <Button text='one-click checkout' onClick={props.submitOrder} />
    </aside>
  )
}

export default CartContainer;