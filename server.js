const app = require('./app.js')
const syncAndSeed = require('./db.js')

const PORT = process.env.PORT || 3000;

syncAndSeed()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e)
  })

