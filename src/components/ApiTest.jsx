import React from 'react';
import axios from 'axios';

class ApiTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inventory: null,
      promos: null
    }
  }

  componentDidMount(){
    function getInventory() {
      return axios.get(`http://jst.edchavez.com/api/inventory/getInventory`)
    }

    function getPromos() {
      return axios.get(`http://jst.edchavez.com/api/promo`)
    }

    axios.all([getInventory(),getPromos()]).then(
      axios.spread( (inventory, promos) => {
        this.setState({
          inventory: inventory.data.items,
          promos: promos.data
        })
      })
    )
  }

  render() {
    let inventory = this.state.inventory ? this.state.inventory.map( item => <p key={item.itemId}>{item.name}</p> ) : ''
    let promos = this.state.promos ? this.state.promos.map( promo => <p key={promo.promoId}>{promo.promoId}</p> ) : ''
    return (
      <div>
        {inventory}
        {promos}
      </div>
    )
  }
}

export default ApiTest;