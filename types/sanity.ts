export interface Banner {
  _id: string;
  title: string;
  image: any;
  link?: string;
  sequence?: number;
  isActive?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  image?: any;
  description?: string;
  isActive?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  category: { _ref: string; _type: 'reference' };
  image: any;
  description?: string;
  price: number;
  salePrice?: number;
  carats?: number;
  rashi?: string[];
  isActive?: boolean;
}

export interface Consultation {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
  description?: string;
  baseFee: number;
  assignedAstrologers?: { _ref: string; _type: 'reference' }[];
  isActive?: boolean;
}

export interface Astrologer {
  _id: string;
  name: string;
  slug: { current: string };
  photo: any;
  specializations: string[];
  languages: string[];
  bio?: string;
  isActive?: boolean;
}
