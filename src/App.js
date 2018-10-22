import React, { Component } from 'react';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import InventoryContainer from './components/InventoryContainer';
import CartContainer from './components/CartContainer';
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
      orderSubTotal: 0
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

    // fire off GET requests concurrently => stash data in state
    axios.all(getRequests).then(
      axios.spread((inventory, promos, shipping) => {
        this.setState({
          inventory: inventory.data.items,
          promos: promos.data,
          shipping: shipping.data
        })
      })
    ).catch( err => console.log(err))
  }

  addItemToCart(item) {
    // handle event: add item to cart
    const itemsInCart = Array.from(this.state.itemsInCart)
    itemsInCart.push(item)
    const orderSubTotal = itemsInCart.reduce((sum, item) => sum + item.price, 0)
    this.setState({
      itemsInCart,
      orderSubTotal
    })
  }

  removeItemFromCart(item) {
    // handle event: remove item from cart
    console.log('REMOVING', item.name)
    const itemsInCart = Array.from(this.state.itemsInCart)
    const itemIndex = itemsInCart.indexOf(item)
    let orderSubTotal = this.state.orderSubTotal - item.price
    itemsInCart.splice(itemIndex,1)
    this.setState({
      itemsInCart,
      orderSubTotal
    })
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
    const itemsInCart = this.state.itemsInCart
    return (
      <div>
        <Header headline="RAM Mounts Technical" 
          subhead={'GET it, GET it, GET it, POST it.'} 
        />
        <Nav />
        <main>
          <InventoryContainer id='inventory'
            items={items} 
            addItem={this.addItemToCart} 
            />
          <CartContainer items={itemsInCart} 
            removeItem={this.removeItemFromCart}
            orderSubTotal={orderSubTotal}
            promo={promos[0]}
            shipping={shipping[0]}
          />
        </main>
        <aside>

        </aside>
      </div>
    );
  }
}

export default App;
