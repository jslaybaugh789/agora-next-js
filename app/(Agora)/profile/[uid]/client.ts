/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const WISHLIST_API = `${HTTP_SERVER}/api/wishlists`;
export const findAllWishlists = async () => {
  const response = await axiosWithCredentials.get(WISHLIST_API);
  return response.data;
};
export const createWishlist = async (wishlist: any) => {
  const response = await axiosWithCredentials.post(WISHLIST_API, wishlist);
  return response.data;
};
export const updateWishlist = async (wishlist: any) => {
  const response = await axiosWithCredentials.put(`${WISHLIST_API}/${wishlist._id}`, wishlist);
  return response.data;
};
export const deleteWishlist = async (wishlistId: string) => {
  const response = await axiosWithCredentials.delete(`${WISHLIST_API}/${wishlistId}`);
  return response.data;
};
export const findWishlistById = async (wishlistId: string) => {
  const response = await axios.get(`${WISHLIST_API}/${wishlistId}`);
  return response.data;
};
export const findWishlistsByBuyerId = async (buyerId: string) => {
  const response = await axios.get(`${WISHLIST_API}/buyer/${buyerId}`);
  return response.data;
};