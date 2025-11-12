// Initiate the server and connect to the database
const express = require("express");
const server = express(); //Create server
const port = 3000; //Assign Port
const mongoose = require("mongoose"); //Require mongo db
const cors = require("cors"); //Allow both servers to run at once
require("dotenv").config(); //Use dotenv to hide private info
const { MONGO_DBI } = process.env; //To grab the same file from dotenv
const Product = require("./models/product"); //Import the mongo model we made

//Middleware
server.use(express.json()); //To send data as JSON
server.use(express.urlencoded({ extended: true })); //Handles encoding and decoding
server.use(cors()); // Lets front end and back end talk

// Connect to the database
mongoose
  .connect(MONGO_DBI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });

// Routes
//Main
server.get("/", (request, response) => {
  response.send("Live");
});

//Grab all data from contact collection
//Async because of delayed travel times ;)
server.get("/products", async (request, response) => {
    try{
        const products = await Product.find(); //Grab all from product
        response.send(products);

    } catch(error) {
        response.status(500).send({message: error.message});
    }
})

server.post("/products", async (request, response) => {
  //This grabs the procuct info and saves it as "newProduct" Then tries to send it to the database
  const {productName, brand, image, price} = request.body;
  const newProduct = new Product({
    productName,
    brand,
    image,
    price
  });
  try {
    await newProduct.save();
    response.send({message: `${productName} has been added`})

  } catch(error) {
    response.status(400).send({message: error.message});
  }
})
//This deletes a product from the database
server.delete("/products/:id", async (request, response) => {
  const {id} = request.params;
  try{
    await Product.findByIdAndDelete(id);
    response.send({message: `Product with ID ${id} has been deleted`})
  } catch(error) {
    response.status(400).send({message: `ID issue?`});
  }
})

//To get one by ID
server.get("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const productToEdit = await Product.findById(id);
    response.send(productToEdit);
  } catch(error) {
    response.status(400).send({message: error.message});
  }
})

//Finally the update! It's almost time for video games and cheetos!
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const {productName, brand, image, price} = request.body;
  await Product.findByIdAndUpdate(id, {
    productName,
    brand,
    image,
    price,
  })
  response.send({message: `${productName} has been updated!`})

  try{

  } catch(error) {
    response.status(400).send(error.message);
  }
})