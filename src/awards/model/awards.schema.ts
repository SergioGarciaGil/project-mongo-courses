
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type AwardsDocument = Awards & Document;

@Schema({ timestamps: true })
export class Awards {
    @Prop()
    title: string;

    @Prop()
    idUser: mongoose.Types.ObjectId;

    @Prop()
    description: string;
}

export const Awardschema = SchemaFactory.createForClass(Awards);