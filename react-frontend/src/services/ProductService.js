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
    return axios.get(PRODUCTS_API_BASE_URL + "?Id=" + productId);
  }

  updateProduct(product) {
    return axios.put(PRODUCTS_API_BASE_URL + "?Id=" + product);
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCTS_API_BASE_URL + "?Id=" + productId);
  }
}

export default new ProductService();
