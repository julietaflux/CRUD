import React from 'react'
import ProductService from '../services/ProductService';
import { useEditProduct } from '../hooks/useEditProduct'

const initialProduct = {
    id: "",
    name: "",
    price: 0,
    cost: 0,
    brand: {
      id: "",
      name: "",
    },
  };

export const CreateProductComponent = (props: any) => {
    const {
        validPrice,
        brands,
        product,
        changeName,
        changeBrand,
        changeCost,
        changePrice,
    } = useEditProduct({ initialProduct })

    const saveProduct = (e: any) => {
        if (!product) return;
        e.preventDefault();
        let p = {Name: product.name, Brand: product.brand, Cost: Number(product.cost), Price: Number(product.price)};
        console.log('product => ' + JSON.stringify(p));

        ProductService.createProduct(p).then(res =>{
            props.history.push('/products');
        });
    }

    const cancel = () => {
        props.history.push('/products');
    }

    return (
        <div>
            <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center my-4">Add Product</h3>
                            <div className = "card-body">
                                <div>
                                    <div className = "form-group">
                                        <label>Name</label>
                                        <input placeholder="Name" name="brand" className="form-control" 
                                            value={product?.name} onChange={changeName}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Brand</label>
                                        <select value={product?.brand.id} onChange={changeBrand} className="form-control" id="exampleFormControlSelect1">
                                            <option value="" disabled>Please select a brand</option>
                                            {brands.map(
                                                brand => 
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label>Cost</label>
                                        <input placeholder="Cost" name="cost" className="form-control" type="number"
                                            value={product?.cost} onChange={changeCost}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Price</label>
                                        <input placeholder="Price" name="price" className={"form-control " + (validPrice ? 'is-valid' : 'is-invalid')}
                                        value={product?.price} onChange={changePrice}/>
                                        {
                                            validPrice! && <span className="invalid-feedback">Price value can not be less than cost value</span> 
                                        }
                                    </div>
                                    <button className={"btn btn-sm " + (validPrice ? 'btn-primary' : 'disabled')} onClick={saveProduct} disabled={!validPrice}>Save</button>
                                    <button className="btn btn-secondary btn-sm" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        </div>
    )
}

export default CreateProductComponent