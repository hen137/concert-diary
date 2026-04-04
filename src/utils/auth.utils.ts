import { betterAuth } from "better-auth";
import { openAPI, username, bearer } from "better-auth/plugins";

export const auth = betterAuth({
  basePath: "/v1/auth",
  trustedOrigins: ["http://localhost:3000"],
  // TODO: setup logger in auth contexts
  plugins: [
    openAPI({
      // TODO: needs to be unified on /docs
      path: "/docs", // gets served on /v1/auth/docs
    }),
    username(
      // TODO: add options when supported
    ),
    bearer(
      // TODO: add options when supported
    ),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      // TODO: get google credentials
      // https://better-auth.com/docs/authentication/google
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: "select_account",
    },
    // TODO: get apple credentials
    // https://better-auth.com/docs/authentication/apple
    // mainaints development restictions that require additional setup
    // apple: {},
    discord: {
      // TODO: get discord credentials
      // https://better-auth.com/docs/authentication/discord
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
});