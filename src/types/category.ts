export interface Category {
  id: number;
  path: string;
  name: string;
}

export interface CategoryWithQuantity extends Category {
  quantity: number;
}
