import { api, type allProducts, type ProductsResponse } from "./api";

export const getAllProducts = async (
  page: number,
  search: string
): Promise<ProductsResponse> => {
  try {
    const response = await api.get(
      `/products?page=${page}&limit=8&search=${search}`
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getDetailedProducts = async (id: string): Promise<allProducts> => {
  try {
    const response = await api.get(`/products/${id}`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
