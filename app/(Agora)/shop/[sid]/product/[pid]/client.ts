/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const PRODUCTS_API = `${HTTP_SERVER}/api/products`;
export const findAllProducts = async () => {
  const response = await axiosWithCredentials.get(PRODUCTS_API);
  return response.data;
};
export const createProduct = async (product: any) => {
  const response = await axiosWithCredentials.post(PRODUCTS_API, product);
  return response.data;
};
export const updateProduct = async (product: any) => {
  const response = await axiosWithCredentials.put(`${PRODUCTS_API}/${product._id}`, product);
  return response.data;
};
export const deleteProduct = async (productId: string) => {
  const response = await axiosWithCredentials.delete(`${PRODUCTS_API}/${productId}`);
  return response.data;
};
export const findProductById = async (productId: string) => {
  const response = await axios.get(`${PRODUCTS_API}/${productId}`);
  return response.data;
};
export const findProductsByShopId = async (shopId: string) => {
  const response = await axios.get(`${PRODUCTS_API}/shop/${shopId}`);
  return response.data;
};