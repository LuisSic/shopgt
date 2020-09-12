import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AddressAttrs {
  name: string;
  address: string;
  country: string;
  deparment: string;
  township: string;
  position: {
    long: string;
    lat: string;
  };
  status: boolean;
  userId: string;
}

interface AddressDoc extends mongoose.Document {
  name: string;
  address: string;
  country: string;
  deparment: string;
  township: string;
  status: boolean;
  version: number;
  position: {
    long: string;
    lat: string;
  };
  userId: string;
}

interface AddressModel extends mongoose.Model<AddressDoc> {
  build(attrs: AddressAttrs): AddressDoc;
}

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deparment: {
      type: String,
      required: true,
    },
    township: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    position: {
      long: {
        type: String,
        required: true,
      },
      lat: {
        type: String,
        required: true,
      },
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(dec, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

addressSchema.set('versionKey', 'version');
addressSchema.plugin(updateIfCurrentPlugin);

addressSchema.statics.build = (attrs: AddressAttrs) => {
  return new Address(attrs);
};

const Address = mongoose.model<AddressDoc, AddressModel>(
  'Address',
  addressSchema
);

export { Address };
