export type User = {
  first_name: string;
  last_name: string;
  phone_number: string;
  id: number;
  is_active: boolean;
  role: 'Admin' | 'POS';
  staff?: {
    laundry?: Laundry;
    branch?: Branch | null;
  }
}

export type UsersList = {
  items: Array<User>;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export type Laundry = {
 id: number;
 name_en: string;
 name_ar: string;
}

export type Branch = {
 id: number;
 address: string;
}
