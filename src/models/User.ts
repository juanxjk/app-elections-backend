enum UserRole {
  Admin = "admin",
  Surveyor = "surveyor",
  Guest = "guest"
}

enum UserStatus {
  Online = "online",
  Surveying = "surveying",
  Offline = "offline"
}

class User {
  public id?: number;
  public fullName!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public role!: UserRole;
  public status!: UserStatus;
  public avatarURL?: string;
}
