import bcrypt from "bcrypt";
import * as data from "./data";
import { AuthenticationError } from "../../utilities/errors";

export async function signup(
  values: data.CreateUser
): Promise<data.UserWithoutPassword> {
  // Encrypt password
  const hashedPassword = await bcrypt.hash(values.password, 12);

  return data.createUser({ ...values, password: hashedPassword });
}

export async function login(values: Pick<data.User, "username" | "password">) {
  const user = await data.getUser({ username: values.username });

  if (!user) {
    throw new AuthenticationError({
      username: "Username not found",
    });
  }

  const validPassword = await bcrypt.compare(values.password, user.password);

  if (!validPassword) {
    throw new AuthenticationError({
      password: "Invalid Password",
    });
  }

  return data.omitPassword(user);
}
