import { IsNotEmpty, IsUrl, Length } from "class-validator";

export class CreateVideoDto {

    @IsNotEmpty()
    @Length(1, 50)
    title: string;

    @IsNotEmpty()
    @Length(1, 300)
    description: string;

    @IsUrl()
    src: string;
}
