import { UserStatus } from "./../../../src/models/User";
import User, { UserRole } from "../../../src/models/User";
import faker from "faker";

export const makeUser = (attrs?: Partial<User>): User => {
  const user = new User();
  user.id = attrs?.id ?? faker.random.uuid();
  user.fullName = attrs?.fullName ?? faker.name.findName();
  user.username = attrs?.username ?? faker.internet.userName();
  user.password = attrs?.password ?? faker.internet.password();
  user.email = attrs?.email ?? faker.internet.email();
  user.isVerified = attrs?.isVerified ?? faker.random.boolean();
  user.role = attrs?.role ?? faker.random.arrayElement(Object.values(UserRole));
  user.status =
    attrs?.status ?? faker.random.arrayElement(Object.values(UserStatus));
  user.avatarURL = attrs?.avatarURL ?? faker.internet.avatar();

  return user;
};
