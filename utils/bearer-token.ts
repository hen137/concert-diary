import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  basePath: "/v1/auth",
  fetchOptions: {
    headers: {
      "Origin": "http://localhost:3000",
    },
  },
});

const reply = await authClient.signUp.email(
  {
    email: "user@example.com",
    password: "securepassword",
    name: "John Doe",
  },
  {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-token");
      console.log("Authentication successful! Token:", authToken);
    },
    onError: (err) => {
      console.log(err.request.headers);
      console.error("Authentication failed:", err);
    },
  },
);
