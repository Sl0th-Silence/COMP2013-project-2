export default function QuantityCounter({
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  _id,
  mode,
}) {
  return (
    <div className="ProductQuantityDiv">
      <div>
        <button onClick={() => handleRemoveQuantity(_id, mode)}>-</button>
      </div>
      <p>{productQuantity}</p>
      <div>
        <button onClick={() => handleAddQuantity(_id, mode)}>+</button>
      </div>
    </div>
  );
}
