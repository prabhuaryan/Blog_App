const mongoose = require("mongoose");

const connection = () => {
  const url = process.env.MONGO_URL_LOCAL;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(console.log(`Connected to DB ${mongoose.connection.host}`))
    .catch((e) => console.log(e));
};

module.exports = connection;
