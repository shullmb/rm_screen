import React from 'react';

export const Header = ({headline, subhead}) => {
  return (
    <header>
      <h1>{headline}</h1>
      <h4>{subhead}</h4>
    </header>
  )
}