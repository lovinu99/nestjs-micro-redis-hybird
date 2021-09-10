import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createrReward1631158614841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'reward',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'varchar'
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reward')
    }

}
