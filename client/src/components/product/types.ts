export interface FormDataProduct {
  name: string;
  description: string;
  price: number;
  image?: Array<File>;
  nameImage: string;
  urlImage: string;
}

export interface RequestDataProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  keyimage: string;
}

export interface ResponseDataProduct {
  description: string;
  id: string;
  imageUrl: string;
  keyimage: string;
  name: string;
  price: number;
  status: boolean;
  version: number;
}
