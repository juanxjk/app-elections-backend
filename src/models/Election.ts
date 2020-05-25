import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import Candidate from "./Candidate";
import ElectionPoll from "./ElectionPoll";

@Entity({ name: "elections" })
export default class Election {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ nullable: false })
  public year!: number;

  @Column({ nullable: false, default: 1 })
  public round!: number;

  @OneToMany((type) => Candidate, (candidate) => candidate.election)
  public candidates?: Promise<Candidate[]>;

  @OneToMany((type) => ElectionPoll, (electionPoll) => electionPoll.election)
  public electionPolls?: Promise<ElectionPoll[]>;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
