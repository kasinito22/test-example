import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1737040916208 implements MigrationInterface {
    name = 'CreateTables1737040916208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`author\` \`author\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`expiredAt\` \`expiredAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`expiredAt\` \`expiredAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updatedAt\` \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`author\` \`author\` varchar(255) NOT NULL`);
    }

}
