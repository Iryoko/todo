import { db } from "../../database";
import { GeneralError } from "../../utilities/errors";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export type UserWithoutPassword = Omit<User, "password">;

export type CreateUser = Pick<User, "username" | "email" | "password">;

export type GetUser = Partial<UserWithoutPassword>;

export function omitPassword(user: User): UserWithoutPassword {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function createUser(data: CreateUser) {
  try {
    // Promise resolves to an array of users
    const result = await db<User>("users").insert(data, "*");
    // Array contains only one user object
    const [user] = result;

    return omitPassword(user);
  } catch (error) {
    // Code for duplication
    if (error.code === "23505") {
      const errorData: Record<string, string> = {};
      const userMessage = "Username is taken";
      const emailMessage = "Email is already used";
      const usernameDuplication = new RegExp("username").test(error.detail);

      if (usernameDuplication) {
        errorData["username"] = userMessage;
        // Check whether email is also duplication
        const userWithEmail = await db<User>("users")
          .select()
          .where("email", data.email);

        if (userWithEmail.length > 0) {
          errorData["email"] = emailMessage;
        }
      } else {
        // Email duplication
        errorData["email"] = emailMessage;
        // Check whether username is also duplication
        const userWithName = await db<User>("users")
          .select()
          .where("username", data.username);

        if (userWithName.length > 0) {
          errorData["username"] = userMessage;
        }
      }

      throw new GeneralError(409, "Duplication Error", errorData);
    }

    throw new GeneralError(500, "Create User Error", error);
  }
}

export async function getUser(data: GetUser): Promise<User> {
  const result = await db<User>("users").select().where(data);

  return result[0];
}
