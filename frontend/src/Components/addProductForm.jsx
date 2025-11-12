export default function AddProductForm({
    productName,
    image,
    brand,
    price,
    handleOnSubmit,
    handleOnChange,
    isEditing,
}) 
{
    return <div>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="productName">Product Name: </label>
            <input type="text" 
            name="productName" 
            id="productName" 
            value={productName} 
            onChange={handleOnChange}
            required
            placeholder="Product Name"/>
            <br />

            <label htmlFor="brand"></label>
            <input type="text" 
            name="brand" 
            id="brand" 
            value={brand} 
            onChange={handleOnChange}
            required
            placeholder="brand"/>
            <br />

            <label htmlFor="image"></label>
            <input type="text" 
            name="image" 
            id="image" 
            value={image} 
            onChange={handleOnChange}
            required
            placeholder="Image Link"/>
            <br />

            <label htmlFor="price"></label>
            <input type="text" 
            name="price" 
            id="price" 
            value={price} 
            onChange={handleOnChange}
            required
            placeholder="Price"/>
            <br />

            <button>{isEditing? "Edit" : "Submit"}</button>
        </form>
    </div>
}