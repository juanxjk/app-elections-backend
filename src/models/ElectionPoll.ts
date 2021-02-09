import User from "./User";
import Election from "./Election";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import Survey from "./Survey";

export enum ElectionPollStatus {
  Running = "running",
  Done = "done",
}

@Entity({ name: "election_polls" })
export default class ElectionPoll {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({
    type: "enum",
    enum: ElectionPollStatus,
    nullable: false,
    default: ElectionPollStatus.Running,
  })
  public status!: ElectionPollStatus;

  @Column({ nullable: false })
  public startDate!: Date;

  @Column({ nullable: true })
  public endDate?: Date;

  @ManyToOne((type) => Election, (election) => election.electionPolls, {
    nullable: false,
  })
  public election!: Election;

  @ManyToOne((type) => User, { nullable: false })
  public createdBy!: User;

  @OneToMany((type) => Survey, (survey) => survey.electionPoll)
  public surveys!: Promise<Survey[]>;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
