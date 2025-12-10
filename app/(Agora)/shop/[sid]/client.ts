/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const SHOPS_API = `${HTTP_SERVER}/api/shops`;
export const findAllShops = async () => {
  const response = await axiosWithCredentials.get(SHOPS_API);
  return response.data;
};
export const createShop = async (shop: any) => {
  const response = await axiosWithCredentials.post(SHOPS_API, shop);
  return response.data;
};
export const updateShop = async (shop: any) => {
  const response = await axiosWithCredentials.put(`${SHOPS_API}/${shop._id}`, shop);
  return response.data;
};
export const deleteShop = async (shopId: string) => {
  const response = await axiosWithCredentials.delete(`${SHOPS_API}/${shopId}`);
  return response.data;
};
export const findShopById = async (shopId: string) => {
  const response = await axios.get(`${SHOPS_API}/${shopId}`);
  return response.data;
};
export const findShopsBySellerId = async (sellerId: string) => {
  const response = await axios.get(`${SHOPS_API}/seller/${sellerId}`);
  return response.data;
};