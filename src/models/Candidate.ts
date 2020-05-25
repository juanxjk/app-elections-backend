import Election from "./Election";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "candidates" })
export default class Candidate {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ nullable: false })
  public name!: string;

  @ManyToOne((type) => Election, (election) => election.candidates)
  public election!: Election;

  @Column()
  public party?: string;

  @Column({ nullable: false })
  public voteNumber!: number;

  @Column()
  public avatarURL?: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
