import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DataSource, Repository } from 'typeorm';
import { Post } from './entities/post.entity';


@Injectable()
export class PostsService {
  constructor(
    private readonly datasource:DataSource,
    
  ){}

  async getOne(find:number|string,language:string){
    let value:Post
    switch(typeof(find)){ //find의 타입 확인해서 string(안내글)과 number(게시글) 분류
      case 'string': //안내글 찾을 경우 
        value=await this.datasource.manager.findOneBy(Post,{category:find,language})//최신글 하나 가져오는 코드 추가
        break
      case 'number': //게시글 찾을 경우 
        value=await this.datasource.manager.findOneBy(Post,{id:find,language})
      }
      
    return {
      message:`${find}`+(typeof(find)=='string')?' 안내글을 불러왔습니다.':'번 게시글을 불러왔습니다.',
      data:value
    }
    
  }

  async getPagination(category:string,page:number,take:number,language:string){ // 카테고리, 현재 페이지, 가져올 글 개수

    const [value,total]=await this.datasource.manager.findAndCount(Post,{where:{category,language},skip:page*take,take})

    const totalPage = Math.ceil(total / take);
    const nextPage = page < totalPage ? `http://localhost:3012/posts/search?category=${category}&limit=${take}&page=${page + 1}` : null;
    const prevPage = page > 1 ? `http://localhost:3012/posts/search?category=${category}&limit=${take}&page=${page - 1}` : null;
    
    return { 
      message:`${category}의 ${page}번째 페이지를 불러왔습니다.`,
      data:value,
      currentPage:page,
      prevPage,
      nextPage,
      totalPage,
    }
  }

  async create(createPostDto: CreatePostDto) {
    await this.datasource.transaction(async manager=>{ //트랜잭션 적용
      await manager.save(Post,createPostDto) //저장
    }).catch(e=>{throw new BadRequestException(`${e.sqlMessage}`)})//실패시 오류 띄우기
    return {message:'글을 작성하였습니다.'}
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.datasource.transaction(async manager=>{
      await manager.update(Post,id,updatePostDto)
    }).catch(e=>{throw new BadRequestException(`${e.sqlMessage}`)})
    return {message:'글을 수정하였습니다.'}
  }

  async remove(id: number) {
    await this.datasource.transaction(async manager=>{
      await manager.delete(Post,{id:id})
    }).catch(e=>{throw new BadRequestException(`${e.sqlMessage}`)})
    return {message:'글을 삭제하였습니다.'}
  }
}
