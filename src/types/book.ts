export interface IBook {
  id: number;
  hasLogo: boolean;
  title: string;
  author: string;
  rating: null | number;
  status: 'available' | 'unavailable' | 'booked';
  unavailableUntil: null | string;
  images: IImage[];
}

export interface IImage {
  id: number;
  src: string;
}
