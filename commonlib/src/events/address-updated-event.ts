import { Subjects } from './subjects';

export interface AddressUpdatedEvent {
  subject: Subjects.AddressUpdated;
  data: {
    name: string;
    address: string;
    country: string;
    deparment: string;
    township: string;
    userId: string;
  };
}
