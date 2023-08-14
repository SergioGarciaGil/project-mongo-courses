
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type CurseDocument = Course & Document;

@Schema()
export class Course {
    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    IdAuthor: mongoose.Types.ObjectId

    @Prop()
    description: string;

    @Prop()
    cover: string
}

export const CourseSchema = SchemaFactory.createForClass(Course);