import React from "react";
import ProductService from "../services/ProductService";
import { useEditProduct } from "../hooks/useEditProduct";

export const UpdateProductComponent = (props: any) => {
  const {
    isComplete,
    validPrice,
    brands,
    product,
    changeName,
    changeBrand,
    changeCost,
    changePrice,
  } = useEditProduct({ productId: props.match.params.id });

  const updateProduct = (e: any) => {
    if (!product) return;
    e.preventDefault();
    let p = {
      Id: product.id,
      Name: product.name,
      Brand: product.brand,
      Cost: Number(product.cost),
      Price: Number(product.price),
    };
    console.log("product => " + JSON.stringify(product));

    ProductService.updateProduct(p).then((res) => {
      props.history.push("/products");
    });
  };

  const cancel = () => {
    props.history.push("/products");
  };

  if (!product) return <div>Loading...</div>;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center py-4">Update Product</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    name="name"
                    className="form-control"
                    value={product.name}
                    onChange={changeName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Brand</label>
                  <select
                    value={product.brand.id}
                    onChange={changeBrand}
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Cost</label>
                  <input
                    placeholder="Cost"
                    name="cost"
                    className="form-control"
                    value={product.cost}
                    onChange={changeCost}
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input
                    placeholder="Price"
                    name="price"
                    className={
                      "form-control " + (validPrice ? "is-valid" : "is-invalid")
                    }
                    value={product.price}
                    onChange={changePrice}
                  />
                  {!validPrice && (
                    <span className="invalid-feedback">
                      Price value can not be less than cost value
                    </span>
                  )}
                </div>

                <button
                  className={
                    "btn btn-sm " +
                    (validPrice && isComplete ? "btn-primary" : "disabled")
                  }
                  onClick={updateProduct}
                  disabled={!validPrice || !isComplete}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={cancel.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductComponent;
