import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AddressAttrs {
  id: string;
  name: string;
  address: string;
  country: string;
  deparment: string;
  township: string;
  userId: string;
}

interface AddressDoc extends mongoose.Document {
  name: string;
  address: string;
  country: string;
  deparment: string;
  township: string;
  version: number;
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
  return new Address({
    _id: attrs.id,
    name: attrs.name,
    address: attrs.address,
    country: attrs.country,
    deparment: attrs.deparment,
    township: attrs.township,
    userId: attrs.userId,
  });
};

const Address = mongoose.model<AddressDoc, AddressModel>(
  'Address',
  addressSchema
);

export { Address };
