import { api, type allProducts, type ProductsResponse } from "./api";

type StatsResponse = {
  totalUsers: {
    count: number;
  };
  totalOrders: {
    count: number;
  };
  totalProducts: {
    count: number;
  };
  totalRevenue: number;
};
export const getAdminStats = async (): Promise<StatsResponse> => {
  try {
    const response = await api.get("/analytics");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: "admin" | "user";
  verified: boolean;
};

// type getUsersResponse = {
//     success: boolean;
//     message: string;
//     data: User[];
// }

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/auth/users");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type Order = {
  id: string;
  userId: string;
  totalAmount: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  status: "Pending" | "Shipped" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
};
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get("/orders");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await api.get("/products");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProduct = async (data: FormData) => {
  try {
    const response = await api.post(`/products`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<allProducts> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: string;
  status: "Pending" | "Shipped" | "Delivered";
}) => {
  const response = await api.patch(`/orders/${id}/status`, {
    status,
  });

  return response.data;
};