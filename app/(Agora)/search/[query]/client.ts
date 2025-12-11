/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const SEARCH_API = `${HTTP_SERVER}/api/search`;
export const searchYoutube = async (query: any) => {
  const response = await axiosWithCredentials.post(SEARCH_API, query);
  console.log(response.data.data);
  return response.data.data;
};
export const findVideoById = async (videoId: string) => {
  const response = await axiosWithCredentials.get(`${SEARCH_API}/${videoId}`);
  return response.data.data;
}