import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

export interface ProductsResponse {
  products: allProducts[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasMore: boolean;
}

export type allProducts = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  imageUrl: string;
  ratings: string;
  numReviews: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};


  

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});
