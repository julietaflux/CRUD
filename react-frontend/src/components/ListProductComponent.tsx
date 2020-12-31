import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Product } from "../utils/Product.model";

export const ListProductComponent = (props: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const deleteProduct = (id: string) => {
    ProductService.deleteProduct(id).then((res) => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  const viewProduct = (id: string) => {
    props.history.push(`/view-product/${id}`);
  };

  const editProduct = (id: string) => {
    props.history.push(`/update-product/${id}`);
  };

  const addProduct = () => {
    props.history.push("/add-product/_add");
  };

  return (
    <div>
      <h4 className="text-center my-4">Products List</h4>
      <div className="row">
        <button className="btn btn-primary btn-sm" onClick={addProduct}>
          Add Product
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-bordered table-sm table-hover table-striped">
          <thead className="thead">
            <tr>
              <th className="pl-3">Id</th>
              <th className="pl-3">Name</th>
              <th className="pl-3">Brand Id</th>
              <th className="pl-3">Brand Name</th>
              <th className="pl-3">Cost</th>
              <th className="pl-3">Price</th>
              <th className="pl-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="pl-3"> {product.id} </td>
                <td className="pl-3"> {product.name} </td>
                <td className="pl-3"> {product.brand.id} </td>
                <td className="pl-3"> {product.brand.name}</td>
                <td className="pl-3">$ {product.cost}</td>
                <td className="pl-3">$ {product.price}</td>
                <td className="pl-3">
                  <button
                    onClick={() => editProduct(product.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Update{" "}
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Delete{" "}
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => viewProduct(product.id)}
                    className="btn btn-primary btn-sm"
                  >
                    View{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProductComponent;
