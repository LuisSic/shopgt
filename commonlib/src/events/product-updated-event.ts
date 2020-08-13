import { Subjects } from './subjects';

export interface ProductUpdatedEvent {
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
