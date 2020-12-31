import { useState, useEffect } from "react";
import BrandService from "../services/BrandService";
import ProductService from "../services/ProductService";
import { Product } from "../utils/Product.model";
import { Brand } from "../utils/Brand.model";

interface UseEditProductParams {
  initialProduct?: Product | null;
  productId?: string;
}
export const useEditProduct = ({
  initialProduct = null,
  productId,
}: UseEditProductParams = {}) => {
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [validPrice, setValidPrice] = useState<Boolean>();

  useEffect(() => {
    if (!product?.price && !product?.cost) return;
    setValidPrice(product.cost < product.price);
  }, [product]);

  // if (productId) // estamos updateando
  // else if (initialProduct) // estamos creando

  useEffect(() => {
    if (!productId && !initialProduct) return;
    ProductService.getProductById(productId).then(({ data }) => {
      setProduct(data[0]);
    });
  }, [productId]);

  useEffect(() => {
    BrandService.getBrands().then(({ data }) => {
      setBrands(data);
    });
  }, []);

  const changeName = (event: any) => {
    if (!product) return;
    setProduct({
      ...product,
      name: event.target.value,
    });
  };

  const changeBrand = (event: any) => {
    const brand = brands.find((b) => b.id === event.target.value);
    if (!brand || !product) return;
    setProduct({
      ...product,
      brand,
    });
  };

  const changeCost = (event: any) => {
    if (!product) return;
    setProduct({
      ...product,
      cost: Number(event.target.value),
    });
  };

  const changePrice = (event: any) => {
    if (!product) return;
    setProduct({
      ...product,
      price: Number(event.target.value),
    });
  };

  return {
    validPrice,
    brands,
    product,
    changeName,
    changeBrand,
    changeCost,
    changePrice,
  };
};
