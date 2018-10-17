import React from 'react';
import axios from 'axios';

class ApiTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: null
    }
  }

  componentDidMount(){
    let url = `http://jst.edchavez.com/api/inventory/getInventory`
    axios.get(url).then( response => {
      console.log(response.data)
      this.setState({
        response: response.data.items
      })
    })  
  }

  render() {
    var response = this.state.response ? this.state.response.map( item => <p key={item.itemId}>{item.name}</p>) : <p>Hold for inventory</p>;
    return (
      <div>
        {response}
      </div>
    )
  }
}

export default ApiTest;