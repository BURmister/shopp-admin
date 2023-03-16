import { product } from "./product.types";

export type delivery = {
   _id: string;
   deliveryKey: string;
   deliveryName: string;
   deliveryDescription?: string;
   from: string;
   beggining: string;
   ending: string;
   products: product[];
};
