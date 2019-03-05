import React, {Component} from 'react';
import List from './List';
import axios from 'axios';

class App extends Component{
  constructor(){
    super();
    console.log('hiya! in constructor')
    this.state = {
      categories: [],
      products: []
    };
    console.log(this.state.products)
    console.log(this.state.categories)
    this.createCategory = this.createCategory.bind(this);
    this.destroyCategory = this.destroyCategory.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.destroyProduct = this.destroyProduct.bind(this);
  }

  createCategory(){
    axios.post('/api/categories')
      .then( response => response.data)
      .then( category => {
        const categories = this.state.categories;
        categories.push(category);
        this.setState({ categories });
      });
  }

  destroyCategory(id){
    axios.delete(`/api/categories/${ id }`)
      .then( () => {
        let categories = this.state.categories;
        categories = categories.filter( category => category.id !== id);
        let products = this.state.products;
        products = products.filter( product => product.categoryId !== id)
        this.setState({ categories, products });
      });
  }

  createProduct(id){
    axios.post(`/api.categories/${ id }/products`)
      .then(response => response.data)
      .then(product => {
        const categories = this.state.categories;
        const products = this.state.products;
        products.push( product );
        this.setState({ categories, products })
      })
  }

  destroyProduct(id){
    axios.delete(`ap1/products/${ id }`)
      .then( () => {
        let products = this.state.products;
        products = products.filter( product => product.id !== id)
        this.setState({ products })
    })
  }

  componentDidMount(){
    axios.get('/api/categories')
      .then( response => response.data)
      .then( ({ categories, products })  => this.setState({ categories, products }));
  }

  render(){
      const { categories, products } = this.state;
      const { createCategory, destroyCategory, createProduct, destroyProduct } = this;

      return (
        <div>
          <h1>Acme Products and Categories</h1>
          <button onClick={ createCategory }>Add Category</button>
          <List categories={ categories } products={ products } destroyCategory={ destroyCategory } createProduct={createProduct} destroyProduct={ destroyProduct } />
        </div>
      );
  }
}


export default App;
