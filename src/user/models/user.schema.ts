import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getHashPassword, getSalt } from 'utils/security';

@Schema()
export class UserDocument extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;

  @Prop({ required: false, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.pre<UserDocument>('save', async (next: Function) => {
  const user: UserDocument = this;

  if (!user.isModified('password')) {
    return next();
  }

  if (user.password) {
    const salt = await getSalt();
    const hashPassword = await getHashPassword(user.password, salt);
    user.salt = salt;
    user.password = hashPassword;
  }

  next();
});
