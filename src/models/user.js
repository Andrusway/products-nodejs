import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre('save', function () {
  if (!this.avatar) {
    this.avatar = 'https://ac.goit.global/fullstack/react/default-avatar.jpg';
  }
});

export const User = model('User', userSchema);
