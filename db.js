const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_products_categories',
  {
    logging: false
  }
);
const faker = require('faker');

const Category = conn.define('category', {
  name: Sequelize.STRING
});

const Product = conn.define('product', {
  name: Sequelize.STRING
});

Category.hasMany(Product);
// Product.belongsTo(Category)

Category.createFake = function() {
  return this.create({ name: faker.commerce.department() });
};

Category.prototype.createProduct = function() {
  return Product.create({
    name: faker.commerce.productName(),
    categoryId: this.id
  });
};

const categoryNames = ['Foo', 'Bar', 'Bazz'];

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(async () => {
    const [Foo, Bar, Baz] = await Promise.all(
      categoryNames.map(name => Category.create({ name }))
    );
    await Promise.all([
      Product.create({ name: 'Foo Product', categoryId: Foo.id }),
      Product.create({ name: 'Bar Product', categoryId: Bar.id }),
      Product.create({ name: 'Baz Product', categoryId: Baz.id })
    ]);
  });
};

module.exports = {
  syncAndSeed,
  Product,
  Category
};
