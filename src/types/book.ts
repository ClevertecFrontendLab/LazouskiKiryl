export interface Book {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string | null;
  authors: string[] | null;
  image?: Image | null;
  categories: string[] | null;
  booking: {
    id: number;
    order: boolean;
    dateOrder: string | null;
    customerId: number | null;
    customerFirstName: string | null;
    customerLastName: string | null;
  } | null;
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string | null;
    dateHandedTo: string | null;
    recipientId: number | null;
    recipientFirstName: string | null;
    recipientLastName: string | null;
  } | null;
  histories: History[] | null;
}

export interface BookDetails extends Book {
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  images: Image[] | null;
  comments: Comment[] | null;
}

export interface Image {
  url: string | null;
}

interface History {
  id: number | null;
  userId: number | null;
}

export interface Comment {
  id: number | null;
  rating: number;
  text: string | null;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}
