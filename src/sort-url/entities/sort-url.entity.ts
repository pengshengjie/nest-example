import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SortUrl {
  @Prop({ required: true, unique: true })
  sortUrl: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, default: false })
  derectForever: boolean;

  @Prop({ required: true, default: 0 })
  useCount: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SortUrlSchema = SchemaFactory.createForClass(SortUrl);

SortUrlSchema.set('timestamps', true);

export type SortUrlDocument = SortUrl & Document;
