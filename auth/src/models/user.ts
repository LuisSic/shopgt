import mongoose from 'mongoose';
import { AuthProvider } from '../strategies/authProvider/auth-provider';

export { AuthProvider };

interface UserAttrs {
  providerId: string;
  createDate: string;
  nameAuthProvider: AuthProvider;
}

interface UserDoc extends mongoose.Document {
  createDate: string;
  nameAuthProvider: AuthProvider;
  providerId: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  createDate: {
    type: String,
    required: true,
  },
  nameAuthProvider: {
    type: String,
    required: true,
    enum: Object.values(AuthProvider),
  },
  providerId: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
