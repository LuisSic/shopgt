import moongose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductDoc } from './product';

interface ShopCartAttrs {
  userId: string;
  orderId: string;
  items: [
    {
      product: ProductDoc;
      quantity: number;
    }
  ];
}

interface ShopCartDoc extends moongose.Document {
  userId: string;
  orderId: string;
  items: [
    {
      product: ProductDoc;
      quantity: number;
    }
  ];
  version: number;
}

interface ShopCartModel extends moongose.Model<ShopCartDoc> {
  build(attrs: ShopCartAttrs): ShopCartDoc;
}

const shopcartSchema = new moongose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    items: [
      {
        _id: false,
        product: { type: moongose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
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

shopcartSchema.set('versionKey', 'version');
shopcartSchema.plugin(updateIfCurrentPlugin);

shopcartSchema.statics.build = (attrs: ShopCartAttrs) => {
  return new ShopCart(attrs);
};

const ShopCart = moongose.model<ShopCartDoc, ShopCartModel>(
  'ShopCart',
  shopcartSchema
);

export { ShopCart };
