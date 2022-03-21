import React from 'react'
import ListItem from './ListItem'

const ProductList = ({list}) => {
  // console.log(list)
  return (
    <div className='container py-4'>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {list.map((item,index)=>(
          <ListItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default ProductList