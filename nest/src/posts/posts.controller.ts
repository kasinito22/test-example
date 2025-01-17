import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AttachmentService } from './attachment.service';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly attachmentService: AttachmentService
  ) {}
  @Post('test')
  async reight(@Body('file') file){
    console.log('first')
    return this.attachmentService.create(file,1)
  }

  @Get()
  async getOne(@Query('category') category:string,@Query('id') id:number, @Req() res:Request){
    // console.log(res)
    const find = category?category:id
    console.log(find)
    return await this.postsService.getOne(find,'korean')
  }

  @Get(':category')
  async getAll(@Param() category:string,@Query('limit') limit:number,@Query('page') page:number){

    return await this.postsService.getPagination(category,page,limit,'korean')
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    // if(createPostDto.attachment){ //업로드 파일 있을시 저장하는 코드
    // }
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    // if(createPostDto.attachment){ //업로드 파일 있을시 저장하는 코드
    // }
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //업로드 파일 삭제하는 코드
    return this.postsService.remove(+id);
  }


}
