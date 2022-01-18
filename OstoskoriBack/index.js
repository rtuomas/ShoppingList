require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

const listSchema = new mongoose.Schema({
  name: String,
  uniqueId: Number
})
const Product = mongoose.model('product', listSchema)

const app = express()
app.use(cors())
app.use(express.json())






app.get("/api/list", (req, res) => {
  Product
    .find()
    .then(result => {
      res.json(result)
    })
});

app.post("/api/newProduct", (req, res) => {
  console.log("server newproduct ", req.body)
  const newProduct = new Product({
    name: req.body.name,
    uniqueId: req.body.uniqueId
  });
  newProduct.save()
  res.json({message: "Successful",
            body : req.body})
});

app.post("/api/removeProduct", (req, res) => {


  Product.findOneAndDelete( {uniqueId: req.body.uniqueId }, function (err, docs) {
    if (err){
        console.log(err)
        res.sendStatus(500)
    }
    else{
        console.log("Deleted User : ", docs);
        res.status(200).json({message: "Successful deletion"})
    }
  });



});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});