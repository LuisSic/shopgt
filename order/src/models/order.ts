import mongoose from 'mongoose';
import { OrderStatus } from '@blackteam/commonlib';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface Cart {
  product: any;
  quantity: number;
}

interface Address {
  address: string;
  country: string;
  deparment: string;
  township: string;
  position: {
    lat: string;
    long: string;
  };
}

interface OrderAttrs {
  userId: string;
  total: number;
  status: OrderStatus;
  homeAddress: Address;
  shopCartId: string;
  shopCart: Array<Cart>;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  total: number;
  homeAddress: Address;
  shopCart: Array<Cart>;
  status: OrderStatus;
  shopCartId: string;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    homeAddress: {
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
      position: {
        lat: {
          type: String,
          required: true,
        },
        long: {
          type: String,
          required: true,
        },
      },
    },
    shopCart: {
      type: Array,
      require: true,
    },
    shopCartId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
