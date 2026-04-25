export interface ICommonCardsProps {
  className?: string;
  children: React.ReactNode;
}

export interface IProductCardProps {
  id: string | number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  badgeText?: string;
  className?: string;
  onAddtoCart?: () => void;
  isInCart?: boolean;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[]; // 👈 API gives array
}

export interface ICartItem extends IProduct {
  quantity: number;
}
