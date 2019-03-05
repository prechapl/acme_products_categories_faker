import React from 'react';

const ProductList = ({ products, destroyProduct }) => {
  return (
    <ul>
      {products.map(product => {
        return (
          <li key={product.id}>
            <div>
              <span>
                {product.name}
                <button onClick={() => destroyProduct(product.id)}>
                  Delete Product
                </button>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default ProductList;
