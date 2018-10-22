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
      user: {
        firstName: 'Mock',
        lastName: 'Mockerson'
      },
      message: '', 
      inventory: null,
      promos: null,
      shipping: null,
      itemsInCart: [],
      selectedPromo: null,
      selectedShipping: null,
      orderSubTotal: 0
    }
    this.addItemToCart = this.addItemToCart.bind(this)
    this.removeItemFromCart = this.removeItemFromCart.bind(this)
    this.handleOrderSubmission = this.handleOrderSubmission.bind(this)
    this.updatePromoSelection = this.updatePromoSelection.bind(this)
    this.updateShippingSelection = this.updateShippingSelection.bind(this)
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
          selectedPromo: null,
          shipping: shipping.data,
          selectedShipping: shipping.data[0]
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
    const itemsInCart = Array.from(this.state.itemsInCart)
    const itemIndex = itemsInCart.indexOf(item)
    let orderSubTotal = this.state.orderSubTotal - item.price
    itemsInCart.splice(itemIndex,1)
    this.setState({
      itemsInCart,
      orderSubTotal
    })
  }

  updatePromoSelection(promo) {
    const selectedPromo = this.state.promos[promo]
    // handle event: promo selected
    this.setState({selectedPromo})
  }

  updateShippingSelection(shipOption) {
    // handle event: shipping option selected
    const selectedShipping = this.state.shipping[shipOption]
    this.setState({selectedShipping})
  }

  handleOrderSubmission() {
    // handle event: post order to api
    const url = 'http://jst.edchavez.com/api/order';

    /* -- MOCKUP ORDER INFO -- */
    const orderId = uuid().split('-').join('')
    const merchantOrderReference = uuid().split('-').join('')
    const orderDate = 1540234710
    console.log({orderId, merchantOrderReference, orderDate})
    const signature = `${this.state.user.firstName} ${this.state.user.lastName}`

    const orderInfo = {
      merchantId: "RM_MM_102218",
      orderItems: [
        {
          qtyOrdered: 1,
          name: "John Snow Life 2",
          description: "This is Jon Snow's life",
          price: 4,
          itemId: "Sku-02",
          inStock: true,
          stock: 1
        },
        {
          qtyOrdered: 1,
          name: "John Snow Life 4",
          description: "This is Jon Snow's life",
          price: 4,
          itemId: "Sku-04",
          inStock: true,
          stock: 1
        }
      ],
      taxTotal: 10,
      shippingTotal: 2,
      discountTotal: 2,
      promotion: {
        orderSubTotal: 8,
        promoAmt: 2,
        promoId: 'Promo-1',
        promotionName: 'Fixed Value Promo',
        start: "10/21/2018",
        end: "10/21/2018",
        minimumOrderValue: 1.1,
        promotionType: 'ValueOff'
      },
      merchantOrderReference: merchantOrderReference,
      orderId: orderId,
      orderDate: orderDate,
      signature: signature
    }
  
    // POST /api/order
    axios({
      method: 'post',
      url: url,
      data: orderInfo,
      headers: { "Content-Type": "application/json; charset=utf-8"}
    }).then( succ => {
      console.log('Order Successful', succ)
      let transactionId = succ.data.transactionId
      this.setState({
        message: `Order Successful! #${transactionId} is on its way`,
        itemsInCart: [],
        selectedPromo: null,
        selectedShipping: null,
        orderSubTotal: 0
      })
    })
      .catch( err => console.log(err))
  }

  render() {
    const user = this.state.user.firstName
    const message = this.state.message ? this.state.message : ''
    const items = this.state.inventory ? this.state.inventory : ''
    const orderSubTotal = this.state.orderSubTotal || 0
    const promos = this.state.promos || ''
    const promo = this.state.selectedPromo ? this.state.selectedPromo : ''
    const shipping = this.state.shipping || ''
    const selectedShipping = this.state.selectedShipping
    const itemsInCart = this.state.itemsInCart
    return (
      <div>
        <Header headline="RAM Mounts Technical" 
          subhead={'GET it, GET it, GET it, POST it.'} 
        />
        <Nav message={message} />
        <main>
          <InventoryContainer id='inventory-container'
            items={items} 
            addItem={this.addItemToCart} 
            />
          <CartContainer id='cart-container'
            user={user}
            items={itemsInCart} 
            removeItem={this.removeItemFromCart}
            submitOrder={this.handleOrderSubmission}
            updatePromoSelection={this.updatePromoSelection}
            updateShippingSelection={this.updateShippingSelection}
            orderSubTotal={orderSubTotal}
            promos={promos}
            promo={promo}
            shipping={selectedShipping}
            shippings={shipping}
          />
        </main>
        <footer>
          <p>Michael Shull &copy; 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
