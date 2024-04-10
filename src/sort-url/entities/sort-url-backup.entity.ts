import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SortUrlBackup {
  @Prop({ required: true, unique: true })
  sortUrl: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SortUrlBackupSchema = SchemaFactory.createForClass(SortUrlBackup);

SortUrlBackupSchema.set('timestamps', true);

export type SortUrlBackupDocument = SortUrlBackup & Document;
