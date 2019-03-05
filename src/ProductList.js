import React from 'react';

const ProductList = ({ products, destroyProduct }) => {
    return (
        <ul>
            {
                products.map( (product) => {
                    return (
                        <li key={product.id}>
                            {product.name}
                                <div>
                                    <span>
                                        <button onClick={() => destroyProduct(product.id)}>-</button>
                                    </span>
                                </div>
                        </li>
                        )
                    })
            }
        </ul>
    )
}
export default ProductList;
