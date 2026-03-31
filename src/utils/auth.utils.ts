import { betterAuth } from "better-auth";
import { username, bearer } from "better-auth/plugins";

export const auth = betterAuth({
  basePath: "/v1/auth",
  trustedOrigins: ["http://localhost:3000"],
  // TODO: setup logger in auth contexts
  plugins: [username(), bearer()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      // TODO: get google credentials
      // https://better-auth.com/docs/authentication/google
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    discord: {
      // TODO: get discord credentials
      // https://better-auth.com/docs/authentication/discord
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
});
