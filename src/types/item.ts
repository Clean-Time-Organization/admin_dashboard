export type Item = {
  id: number;
  name_en: string;
  name_ar: string;
  is_active: boolean;
  services: Array<Service>;
}

export type Service = {
  price: number;
  is_available: boolean;
  service: {
    name_en: string;
    name_ar: string;
  }
}

export type ItemList = {
  items: Array<Item>;
  total: number;
  page: number;
  size: number;
  pages: number;
}
