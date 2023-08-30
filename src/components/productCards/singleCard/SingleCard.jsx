import React from 'react'

const SingleCard = ({productProps}) => {

  console.log(productProps);
  return (
    <div>
      <div>{productProps.name}</div>

    </div>
    
  )
}

export default SingleCard