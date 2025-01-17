//트랜잭션 전용 함수

import { BadRequestException } from "@nestjs/common"
import { DataSource} from "typeorm"

/**
 * post, delete, put transaction function
 * @param queryBuilder
 * queryBuilder[]
 * @param dataSource
 * this.dataSource
 */


export async function TransactionFunction(queryBuilder,dataSource:DataSource){
    const queryRunner=await dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
        for(const query of queryBuilder){ //map은 비동기작업을 하기에 안 맞음
            await query.execute()
        }
        await queryRunner.commitTransaction()
        return true
    } catch (e) {
        await queryRunner.rollbackTransaction()
        throw new BadRequestException(`${e.sqlMessage}`)
    }finally{
        await queryRunner.release()
    }
}