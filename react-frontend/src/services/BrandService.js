import axios from "axios";

const BRANDS_API_BASE_URL = "/brands/";

class BrandService {
  getBrands() {
    return axios.get(BRANDS_API_BASE_URL);
  }
}

export default new BrandService();
