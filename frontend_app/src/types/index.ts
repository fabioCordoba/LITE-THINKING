import { z } from "zod";

/** Auth & users */
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
