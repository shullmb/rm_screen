import React, { Component } from 'react';

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPromo: this.props.selectedPromo,
      selectedShipping: this.props.selectedShipping
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }


}

export default Cart;