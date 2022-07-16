import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TransactionDocument extends Document {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionDocument);
