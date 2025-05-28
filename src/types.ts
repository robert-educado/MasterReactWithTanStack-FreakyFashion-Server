export type Product = {
  id: number;
  name: string;
  description: string | null;
  sku: string;
  price: number;
  imageUrl: string;
  brand: string;
  slug: string | null;
  locale: string;
  new: boolean
};

export type CategoryWithProducts = {
  id: number;
  name: string;
  slug: string;
  locale: string;
  products: Product[];
};

export type AboutResponse = {
  title: string;
  sections: Section[];
};

export interface Section {
  heading: string;
  content: string | Section[];
}
