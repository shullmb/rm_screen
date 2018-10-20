import React, { Component } from 'react';
import axios from 'axios';
import './style/App.scss';
import CartContainer from './components/CartContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inventory: null,
      promos: null,
      shipping: null,
      orderSubTotal: 0
    }
  }

  componentDidMount() {
    const getRequests = ['inventory/getInventory', 'promo', 'shipping'].map( route => {
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
    return (
      <div>
        <h1>Test App</h1>
        <h4>Get it, Get it, Get it, Post it</h4>
        <CartContainer items={items}/>

      </div>
    );
  }
}

export default App;
