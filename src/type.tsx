enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export interface iUser {
  isAuthenticated: boolean;
  id: number;
  login: string;
  fullName: string;
  gender: Gender;
  phone: string;
  authorities: string[];
}

export interface iProduct {
  id: number;
  name: string;
  price: string;
  categoryName: string;
  shortDes: string;
  fullDes: string;
  imageLink?: string;
}

export interface iCategory {
  category_id: number;
  name: string;
}

export interface iNews {
  id: number;
  name: string;
  link: string;
  imageLink: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

export interface iCartItem {
  id: number;
  quantity: number;
  totalPrice: number;
  cart: iCart;
  product: iProduct;
}

export interface iCart {
  id: number;
  totalItems: number;
  totalPrice: number;
  user: iUser;
  cartItems: iCartItem[];
}

export interface iOrder {
  id: number;
  orderDate: Date;
  totalPrice: number;
  totalQuantity: number;
  orderStatus: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  district: string;
  detailAddress: string;
  email: string;
  notes: string;
  user: iUser;
  orderDetails: iOrderDetail[];
}

export interface iOrderDetail {
  id: number | null;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  order: iOrder | null;
  product: iProduct;
}
