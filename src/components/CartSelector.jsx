import React, { Component } from 'react';
import { formatUSD } from '../helpers/formatter';

export class CartSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shipping: null,
      promo: null
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    const promos = this.props.promos ? this.props.promos.map(promo => <option value={promo.promoId}>${formatUSD(promo.promoAmt, 'I')} {promo.promotionName}</option>) : ''
    const shipping = this.props.shipping ? this.props.shipping.map(shipping => <option value={shipping.shipOptionId}>${formatUSD(shipping.shipCost)} {shipping.shipOptionName} </option>) : ''
    return (
      <form id='cart-select' className='module' onChange={this.handleSelect}>
        <label for="promo"> <span className="text-bold">Promos: </span>
          <select name="promo" id="">
            {promos}
          </select>
        </label>
        <label for="shipping"> <span className="text-bold">Shipping: </span>
          <select name="shipping" id="">
            {shipping}
          </select>
        </label>
      </form>
    )
  }
}
