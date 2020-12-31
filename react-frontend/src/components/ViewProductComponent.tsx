import React, { useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import { Product } from "../utils/Product.model";

export const ViewProductComponent = (props: any) => {
  const [product, setProduct] = useState<Product | null>(null);
  const id = props.match.params.id;

  useEffect(() => {
    ProductService.getProductById(id).then((res) => {
      setProduct(res.data[0]);
    });
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (
    <div>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center my-4">Product Details</h3>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <label className="mr-3">
                <strong>Id</strong>
              </label>
              {product.id}
            </li>
            <li className="list-group-item">
              <label className="mr-3">
                <strong>Name</strong>
              </label>
              {product.name}
            </li>
            <li className="list-group-item">
              <label className="mr-3">
                <strong>Brand Id</strong>
              </label>
              {product.brand?.id}
            </li>
            <li className="list-group-item">
              <label className="mr-3">
                <strong>Brand Name</strong>
              </label>
              {product.brand?.name}
            </li>
            <li className="list-group-item">
              <label className="mr-3">
                <strong>Cost</strong>
              </label>
              $ {product.cost}
            </li>
            <li className="list-group-item">
              <label className="mr-3">
                <strong>Price</strong>
              </label>
              $ {product.price}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewProductComponent;
