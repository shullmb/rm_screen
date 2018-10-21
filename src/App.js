import React, { Component } from 'react';
import CartContainer from './components/CartContainer';
import { Header } from './components/Header';
import { Button } from './components/Button';
import axios from 'axios';
import uuid from 'uuid/v4';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date("10/22/2017"), // setting date to 2017 to account for expired promos
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
    console.log('adding item to cart')
    

  }

  removeItemFromCart() {
    // handle event: remove item from cart
  }

  handleOrderSubmission() {
    // handle event: post order to api
    const url = 'http://jst.edchavez.com/api/order';

    /* -- MOCKUP ORDER INFO -- */
    const orderId = uuid().split('').splice(0,8).join()
    const merchantOrderReference = uuid().split('').splice(8, 8).join()
    var orderInfo = {
      merchantId: "RM_MBS_102118",
      orderItems: this.state.itemsInCart,
      taxTotal: 10, // representing Seattle's 10 percent sales tax as an int
      shippingTotal: this.state.shipping[0].shipAmt,
      discountTotal: this.state.promo[0].promoAmt,
      promotion: this.state.promo[0].promoName,
      merchantOrderReference,
      orderId,
      orderDate: this.state.date,
      signature: "Michael B Shull"
    }

    // POST /api/order
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
        <Header headline="RAM Mounts Technical" subhead={'GET it, GET it, GET it, POST it.'} />
        {/* <Nav /> */}
        <main>
          <CartContainer items={items} 
            orderSubTotal={orderSubTotal}
            promo={promos[0]}
            shipping={shipping[0]}
          />
          <Button text="add item to cart" onClick={this.addItemToCart}/>
        </main>
      </div>
    );
  }
}

export default App;
