import { IsString } from "class-validator"

export class CreatePostDto {
    @IsString()
    category:string
    @IsString()
    title:string
    @IsString()
    content:string
    @IsString()
    language:string
    
    // attachment:File
    
}
