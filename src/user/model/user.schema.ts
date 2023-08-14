
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    email: string;

    @Prop()
    password: string;

    // @Prop()
    // IdAuthor: mongoose.Types.ObjectId

    @Prop()
    avatar: string;

    @Prop()
    description: string
}

export const UserSchema = SchemaFactory.createForClass(User);