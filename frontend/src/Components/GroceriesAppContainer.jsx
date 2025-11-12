import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";

//Backend Imports
import axios from "axios";
import AddProductForm from "./addProductForm";

export default function GroceriesAppContainer() {
  
  //Import products state
  const [products, setProducts] = useState([]);
  //Post response
  const [postResponse, setPostResponse] = useState("");
  //Toggle for if you are editing or adding an entry!
  const [isEditing, setIsEditing] = useState(false)
  //State for form
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  })

  //UseEffect for importing data
  useEffect(() => {
    handleProductsDB();
  }, [postResponse]);

  //UseEffect to set the product quantity
  useEffect(() => {
    if(products.length > 0) //If there are more than zero products, we map the quantity
    {
      //If we don't do this, quantity will be undefined. So much JS :(
      setProductQuantity(products.map((product) => ({ _id: product._id, quantity: 0 })));
    }
  }, [products])

  //Backend Handles
  //Try to grab the data from the API
  const handleProductsDB = async() => {
    try{
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);

    } catch(error) {
      console.log(error.message);
    }
  }

  //Change form handle
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData, [e.target.name]: e.target.value
      };
    })
  }

  //reset the form. Is this the last form I'll make? Probably not, as it is not my final form >:)
  const handleResetForm = () => {
          setFormData({
            productName: "",
            brand: "",
            image: "",
            price: "",
          })
  }


  //Submit form
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try{
      if(isEditing)
      {
        handleOnUpdate(formData._id);
        handleResetForm();
        setIsEditing(false);
      } else {
        await axios.post("http://localhost:3000/products", formData)
        .then((response) => {setPostResponse(response.data.message)})
        console.log(response)
        .then(() => {
          handleResetForm();
        });
      }

    } catch(error) {
      console.log(error.message)
    }
  }

  //Delete entry
  const handleOnDelete = async (id) => {
    try{
      const response = await axios.delete(`http://localhost:3000/products/${id}`);
      setPostResponse(response.data.message);

    } catch(error) {
      console.log(error.message);
    }
  }

  //Edit Entry
  const handleOnEdit = async (id) => {
    try{
      const productToEdit = await axios.get(`http://localhost:3000/products/${id}`);
      console.log(productToEdit);
      setFormData({
        productName: productToEdit.data.productName,
        brand: productToEdit.data.brand,
        image: productToEdit.data.image,
        price: productToEdit.data.price,
        _id: productToEdit.data._id,
      })
      setIsEditing(true);
    } catch(error) {
      console.log(error)
    }
  }

  //Handle updating the API patch route
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(`http://localhost:3000/products/${id}`, formData)
      setPostResponse(result.data.message);
    } catch(error) {
      console.log(error);
    }
  } 

  //States - Old
  const [productQuantity, setProductQuantity] = useState(
    products.map((product) => ({ _id: product._id, quantity: 0 }))
  );
  const [cartList, setCartList] = useState([]);

  //Handles - Old

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product._id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product._id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleAddToCart = (productId) => {
    const product = products.find((product) => product._id === productId);
    const pQuantity = productQuantity.find(
      (product) => product._id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product._id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product._id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  //Return - Forked
  return (
    <div>
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">
        <AddProductForm
          productName={formData.productName}
          brand={formData.brand}
          image={formData.image}
          price={formData.price}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          isEditing={isEditing}
          />
          <p className="postResponse">{postResponse}</p>

        <ProductsContainer
          products={products}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
          productQuantity={productQuantity}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
