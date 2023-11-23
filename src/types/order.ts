import { Laundry } from "./user";

export type Order = {
  id: number;
  created_at: string;
  branch: {
    id: number;
    address: string;
    laundry: Laundry;
  };
  customer: {
    first_name: string;
    last_name: string;
    phone_number: string;
  }
}

export type OrderList = {
  items: Array<Order>;
  total: number;
  page: number;
  size: number;
  pages: number;
}
