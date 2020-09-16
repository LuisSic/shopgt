import { Subjects } from './subjects';

export interface AddressCreatedEvent {
  subject: Subjects.AddressCreated;
  data: {
    id: string;
    name: string;
    address: string;
    country: string;
    deparment: string;
    township: string;
    userId: string;
  };
}
