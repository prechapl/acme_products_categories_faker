const app = require('./app.js')
const db = require('./db')

const PORT = process.env.PORT || 3000;

db.syncAndSeed()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

