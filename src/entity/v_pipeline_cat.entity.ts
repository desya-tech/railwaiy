import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity("v_pipeline_cat")
export class VPipelineCatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column()
  productname: string;

  @Column()
  entry: number;

  @Column()
  r_entry: number;

  @Column()
  ongoing: number;

  @Column()
  r_ongoing: number;

  @Column()
  poreceived: number;

  @Column()
  r_porec: number;

  @Column()
  delivered: number;

  @Column()
  r_delivered: number;
}