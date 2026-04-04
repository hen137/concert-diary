import type { Server } from "../../../../index.js";

import {
  getUserSchema,
  updateUserSchema,
} from "../../../../schemas/users.schema.js";

export default async function (server: Server) {
  server.get("", { schema: getUserSchema }, async (request, response) => {
    const userData = await server.db
      .selectFrom("user_accounts")
      .innerJoin(
        "user_profiles",
        "user_profiles.user_id",
        "user_accounts.user_id",
      )
      .select([
        "user_accounts.user_id",
        "user_accounts.created_at",
        "user_accounts.username",
        "user_profiles.first_name",
        "user_profiles.last_name",
        "user_profiles.avatar_url",
        "user_accounts.created_at",
      ])
      .where("user_accounts.user_id", "=", request.params.id)
      .executeTakeFirst();

    if (!userData) {
      response.status(404);
      return { status: "User not found" };
    }

    return {
      user_id: userData.user_id,
      username: userData.username,
      full_name: userData.first_name + " " + userData.last_name,
      followers_count: 0,
      following_count: 0,
      avatar_url: userData.avatar_url ?? "",
      api_path: `/v1/users/${userData.user_id}/reviews`,
      created_at: userData.created_at,
      followers_path: `/v1/users/${userData.user_id}/followers`,
      following_path: `/v1/users/${userData.user_id}/following`,
      reviews_path: `/v1/users/${userData.user_id}/reviews`,
    };
  });

  server.put("", { schema: updateUserSchema }, async (request, response) => {

  });

  // server.delete("", { schema: {} }, handler);
}
