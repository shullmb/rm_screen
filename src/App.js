import React, { Component } from 'react';
import CartContainer from './components/CartContainer';
import axios from 'axios';
import uuid from 'uuid/v4';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inventory: null,
      promos: null,
      shipping: null,
      itemsInCart: [],
      orderSubTotal: 10000
    }
    this.addItemToCart = this.addItemToCart.bind(this)
    this.removeItemFromCart = this.removeItemFromCart.bind(this)
    this.handleOrderSubmission = this.handleOrderSubmission.bind(this)
  }

  componentDidMount() {
    const apiEndpoints = ['inventory/getInventory', 'promo', 'shipping']
    const getRequests = apiEndpoints.map( resource => {
      return axios.get(`http://jst.edchavez.com/api/${resource}`)
    })

    axios.all(getRequests).then(
      axios.spread((inventory, promos, shipping) => {
        console.log({inventory,promos,shipping})
        this.setState({
          inventory: inventory.data.items,
          promos: promos.data,
          shipping: shipping.data
        })
      })
    ).catch( err => console.log(err))
  }

  addItemToCart() {
    // handle event: add item to cart
  }

  removeItemFromCart() {
    // handle event: remove item from cart
  }

  handleOrderSubmission() {
    // handle event: post order to api
    const url = 'http://jst.edchavez.com/api/order'
    let orderInfo = {
      merchantId: "RM_MBS_102118",
      orderItems: this.state.itemsInCart,
      taxTotal: 2,
      shippingTotal: 3,
      discountTotal: 4,
      promotion: this.state.selectedPromo,
      merchantOrderReference: "sample string 5",
      orderId: "sample string 6",
      orderDate: 1,
      signature: "sample string 7"
    }
    axios.post(url, orderInfo)
      .then( succ => console.log(succ))
      .catch( err => console.log(err))
  }

  render() {
    const items = this.state.inventory ? this.state.inventory : ''
    const orderSubTotal = this.state.orderSubTotal || 0
    const promos = this.state.promos || ''
    const shipping = this.state.shipping || ''
    return (
      <div>
        <h1>Test App</h1>
        <h4>Get it, Get it, Get it, Post it</h4>
        <CartContainer items={items} 
          orderSubTotal={orderSubTotal}
          promo={promos[0]}
          shipping={shipping[0]}
        />

      </div>
    );
  }
}

export default App;
