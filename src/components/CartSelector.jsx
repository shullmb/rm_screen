import React, { Component } from 'react';
import { formatUSD } from '../helpers/formatter';

export class CartSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shipping: 0,
      promo: 0
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    let selected = e.target.name
    let value = e.target.value
    if (selected === 'promo') {
      let promo = value
      this.props.updatePromo(promo) 
    } else {
      let shipOption = value
      this.props.updateShipping(shipOption)
    }
    this.setState({
      [selected]: value
    })
  }
  
  render() {
    const promos = this.props.promos ? this.props.promos.map((promo, i) => {
      // promotions disabled until minimum order threshold met
        if (this.props.orderSubTotal >= promo.minimumOrderValue) {
          return <option key={promo.promotionName} value={i}>{promo.promotionName}</option>
        }
      return <option key={promo.promotionName} disabled value={i}>{promo.promotionName}</option>
      }
    ) : ''
    const shipping = this.props.shipping ? this.props.shipping.map((shipping, i)=> (
        <option key={`${i}-${shipping.shipCost}`} value={i}>${formatUSD(shipping.shipCost)} {shipping.shipOptionName} </option>
      ) 
    ) : ''
    return (
      <form id='cart-select' className='module' onChange={this.handleSelect}>
        <label htmlFor="promo"> <span className="text-bold">Promos: </span>
          <select name="promo">
            {promos}
          </select>
        </label>
        <label htmlFor="shipping"> <span className="text-bold">Shipping: </span>
          <select name="shipping">
            {shipping}
          </select>
        </label>
      </form>
    )
  }
}
