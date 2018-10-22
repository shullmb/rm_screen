import React, { Component } from 'react';

export class Thumbnail extends Component {
  state={
    url: `https://source.unsplash.com/100x100/`,
    alt: ''
  }
  componentDidMount() {
    const qsArr = ['snow', 'castle', 'wolf', 'iceland', 'aurora'];
    let qs = qsArr[Math.floor(Math.random() * qsArr.length)];

    this.setState({
      url: `https://source.unsplash.com/100x100/?${qs}`,
      alt: qs
    })
  }

  render() {
    return (
      <img className='inv-img' src={this.state.url} alt={this.state.qs} />
    )
  }
}