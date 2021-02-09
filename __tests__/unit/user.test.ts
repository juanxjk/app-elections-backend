import faker from "faker";
import { makeUser } from "../utils/factories/UserFactory";

describe("security", async () => {
  it("must validate hash for valid password", async () => {
    const password = faker.internet.password();
    const user = makeUser({ password });
    expect(user.checkPassword(password)).toBeTruthy();
  });
  it("must return false on checking hash for invalid password", async () => {
    const password = faker.internet.password();
    const password2 = faker.internet.password();
    const user = makeUser({ password });
    expect(user.checkPassword(password2)).toBeFalsy();
  });
});
