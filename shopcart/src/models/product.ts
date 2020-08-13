import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProductAttrs {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  keyimage: string;
}

export interface ProductDoc extends mongoose.Document {
  name: string;
  price: number;
  imageUrl: string;
  keyimage: string;
  version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<ProductDoc | null>;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    keyimage: {
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

productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product({
    _id: attrs.id,
    name: attrs.name,
    price: attrs.price,
    keyimage: attrs.keyimage,
    imageUrl: attrs.imageUrl,
  });
};

productSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Product.findOne({ _id: event.id, version: event.version - 1 });
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);

export { Product };
