import bcrypt from "bcrypt";
import { Entity, Column, PrimaryGeneratedColumn, ObjectID } from "typeorm";

export enum UserRole {
  Admin = "admin",
  Surveyor = "surveyor",
  Guest = "guest",
}

export enum UserStatus {
  Online = "online",
  Surveying = "surveying",
  Offline = "offline",
}

@Entity({ name: "users" })
export default class User {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public fullName!: string;

  @Column({ nullable: false, unique: true })
  public username!: string;

  public set password(password: string) {
    this.passwordHash = bcrypt.hashSync(password, 10);
  }

  @Column({ nullable: false, select: false })
  private passwordHash!: string;

  @Column({ nullable: false, unique: true })
  public email!: string;

  @Column({ nullable: false, default: false })
  public isVerified!: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    nullable: false,
    default: UserRole.Guest,
  })
  public role!: UserRole;

  @Column({
    type: "enum",
    enum: UserStatus,
    nullable: false,
    default: UserStatus.Offline,
  })
  public status!: UserStatus;

  @Column({ nullable: true })
  public avatarURL?: string;

  public checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}
