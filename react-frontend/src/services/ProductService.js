import axios from "axios";

const PRODUCTS_API_BASE_URL = "/products/";

class ProductService {
  getProducts() {
    return axios.get(PRODUCTS_API_BASE_URL);
  }

  createProduct(product) {
    return axios.post(PRODUCTS_API_BASE_URL, product);
  }

  getProductById(productId) {
    return axios.get(PRODUCTS_API_BASE_URL + productId);
  }

  updateProduct(product) {
    return axios.patch(PRODUCTS_API_BASE_URL, product);
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCTS_API_BASE_URL + productId);
  }
}

export default new ProductService();
