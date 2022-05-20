import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity("m_rule")
export class RulesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  RULE_ID: string;

  @Column()
  RULE_NAME: string;

  @Column()
  USER_MGMT: boolean;

  @Column()
  ACTIVITY_MGMT: boolean;

  @Column()
  LEADERBOARDS_PAGE: boolean;

  @Column()
  CONTENT_MGMT: boolean;

  @Column()
  PIPELINES_PAGE: boolean;

  @Column()
  REVENUE_LEADERBOARD: boolean;

  @Column()
  ISSUPERADMIN: boolean;
}
