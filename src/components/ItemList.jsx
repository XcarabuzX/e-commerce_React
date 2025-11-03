import React from 'react'
import ItemCard from './ItemCard'

const ItemList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ItemList

