import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleOnDelete,
  handleOnEdit,
  handleAddToCart,
  productQuantity,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
          handleAddToCart={handleAddToCart}
          productQuantity={
            productQuantity.find((p) => p._id === product._id)?.quantity
          }
        />
      ))}
    </div>
  );
}
