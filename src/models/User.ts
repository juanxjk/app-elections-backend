import bcrypt from "bcrypt";
export enum UserRole {
  Admin = "admin",
  Surveyor = "surveyor",
  Guest = "guest"
}

export enum UserStatus {
  Online = "online",
  Surveying = "surveying",
  Offline = "offline"
}

export default class User {
  public id?: number;
  public fullName!: string;
  public username!: string;
  public set password(password: string) {
    this.passwordHash = bcrypt.hashSync(password, 10);
  }
  private passwordHash!: string;
  public email!: string;
  public isVerified!: boolean;
  public role!: UserRole;
  public status!: UserStatus;
  public avatarURL?: string;

  public checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}
