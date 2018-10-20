import React, { Component } from 'react';
import './style/App.scss';
import CartContainer from './components/CartContainer';
import axios from 'axios';

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
  }

  componentDidMount() {
    const apiEndPoints = ['inventory/getInventory', 'promo', 'shipping']
    const getRequests = apiEndPoints.map( route => {
      return axios.get(`http://jst.edchavez.com/api/${route}`)
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
    )
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
