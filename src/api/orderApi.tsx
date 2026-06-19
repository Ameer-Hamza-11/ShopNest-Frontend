import type { CreateOrderInput } from "../../../../shared/schemas/order.schema";
import { api } from "./api";

export type Order = {
  id: string;
  items: {
    id: string;
    productId: string;
    qty: number;
    orderId: string;
    price: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  totalAmount: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod?: string;
  paymentStatus: "Pending" | "Shipped" | "Delivered";
  status: "Pending" | "Paid" | "Failed";
};

export type OrderResponse = {
  success: boolean;
  message: string;
  data?: Order[];
};

export const createOrder = async (
  orderData: CreateOrderInput
): Promise<OrderResponse> => {
  try {
    const res = await api.post("/orders", orderData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserOrders = async (): Promise<OrderResponse> => {
  try {
    const res = await api.get("/orders/my-orders");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
