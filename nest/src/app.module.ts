import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { Attachment } from './posts/entities/attachment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        type:'mysql',
        host:config.get<string>('MYSQL_SERVER'),
        port:config.get<number>('MYSQL_PORT'),
        username:config.get<string>('MYSQL_USER'),
        password:config.get<string>('MYSQL_PASSWORD'),
        database:config.get<string>('MYSQL_DATABASE'),
        entities:[Post,Attachment],
        synchronize:false
      })
    }),
  PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
