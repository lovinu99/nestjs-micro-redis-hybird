import { Column, BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reward extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column( {type: 'varchar'} )
    price: string;
}