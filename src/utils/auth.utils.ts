import { betterAuth } from "better-auth";

export const auth = betterAuth({
  basePath: "/v1/auth",
  //   baseURL: "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      // TODO: get google credentials
      // https://better-auth.com/docs/authentication/google
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SEECRET as string,
    },
    discord: {
      // TODO: get discord credentials
      // https://better-auth.com/docs/authentication/discord
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:4000"],
  // TODO: setup logger in auth contexts
});
