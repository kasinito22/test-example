import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AttachmentService } from './attachment.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[],
  controllers: [PostsController],
  providers: [PostsService,AttachmentService],
})
export class PostsModule {}
