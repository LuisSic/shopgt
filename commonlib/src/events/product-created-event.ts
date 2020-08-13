import { Subjects } from './subjects';

export interface ProductCreatedEvent {
  subject: Subjects.ProductUpdated;
  data: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    keyimage: string;
    version: number;
  };
}
