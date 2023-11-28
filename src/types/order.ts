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

export type OrderDetail = {
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
  sub_total_amount?: number;
  vat?: number;
  vat_price?: number;
  payment_status?: string;
  c_status?: string;
  pieces?: number;
  selected_items?: Array<SelectedItems>;
  total_amount?: number;
}

export type SelectedItems = {
  quantity: number;
  sub_total_price: number;
  item: {
    item_type: {
      id: number;
      is_active: boolean;
      name_en: string;
      name_ar: string;
    },
    service: {
      name_en: string;
      name_ar: string;
    },
    quantity: number;
    sub_total_price: number;
  }
}

export type OrderList = {
  items: Array<Order>;
  total: number;
  page: number;
  size: number;
  pages: number;
}
