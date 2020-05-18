import User from "./User";
import Candidate from "./Candidate";
import ElectionPoll from "./ElectionPoll";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export enum ApprovalType {
  Good = "good",
  Normal = "normal",
  Bad = "bad",
}

@Entity({ name: "surveys" })
export default class Survey {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ type: "enum", enum: ApprovalType, nullable: false })
  public approvalType!: ApprovalType;

  @ManyToOne((type) => Candidate, { nullable: false })
  public favoritedCandidate!: Candidate;

  @ManyToOne((type) => Candidate, { nullable: false })
  public notFavoritedCandidate!: Candidate;

  @Column({ nullable: false })
  public surveyDate!: Date;

  @Column({ type: "double precision", nullable: false })
  public latitude?: number;

  @Column({ type: "double precision", nullable: false })
  public longitude?: number;

  @ManyToOne((type) => ElectionPoll, (electionPoll) => electionPoll.surveys, {
    nullable: false,
  })
  public electionPoll!: ElectionPoll;

  @ManyToOne((type) => User, { nullable: false })
  public createdBy!: User;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
