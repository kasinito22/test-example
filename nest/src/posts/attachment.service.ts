import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Attachment } from "./entities/attachment.entity";
import { TransactionFunction } from '../common/transaction'
import * as uuid from 'uuid'

@Injectable()
export class AttachmentService{
    constructor(
        private readonly dataSource:DataSource

    ){}

    async create(file:File,postId:number){
        const url= `uploads-file/${uuid.v1()}`
        return url
        // const returnUrl=await TransactionFunction(,this.dataSource)
    }
}