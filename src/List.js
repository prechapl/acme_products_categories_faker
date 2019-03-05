import React from 'react';

const List = ({ categories, products, destroyProduct, destroyCategory }) => {
  return (
    <ul>
      {
        categories.map( category => {
          const catsProducts = products.filter(product => product.catgeoryId === category.id)
          return (
            <li key={ category.id }>
              { category.name }
              <button onClick={() => destroyCategory(category.id)}>Delete Category</button>
              <ProductList products={catsProducts.id} destroyProduct={destroyProduct} />
            </li>
          );
        })
      }
    </ul>
  );
};

export default List;
