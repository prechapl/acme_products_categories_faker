import React from 'react';
import ProductList from './ProductList';

const List = ({
  categories,
  products,
  destroyProduct,
  destroyCategory,
  createProduct
}) => {
  const productsByCategory = id => {
    return products.filter(product => product.categoryId === id);
  };

  return (
    <ul>
      {categories.map(({ id, name }) => (
        <li key={id}>
          {name}
          <div>
            <span>
              <button onClick={() => createProduct(id)}>Add Product</button>
              <button onClick={() => destroyCategory(id)}>
                Delete Category
              </button>
            </span>
          </div>
          <ProductList
            products={productsByCategory(id)}
            destroyProduct={destroyProduct}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
