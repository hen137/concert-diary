import type { Server } from "../../../index.js";

import { getUserListSchema } from "../../../schemas/users.schema.js";
import { logger } from "../../../utils/logger.utils.js";

export default async function userRoutes(server: Server) {
  server.get("", { schema: getUserListSchema }, async (request, response) => {
    // CONSIDER: add support for offset/page pagination
    // TODO: implement sorting and filtering
    // TODO: add support for first and last page cursors

    const { cursor } = request.query;
    var limit = Math.min(Math.max(request.query.limit, 1), 100);

    const query = server.db
      .selectFrom("user_accounts")
      .innerJoin(
        "user_profiles",
        "user_accounts.user_id",
        "user_profiles.user_id",
      )
      .select([
        "user_accounts.user_id",
        "user_accounts.created_at",
        "user_accounts.username",
        "user_profiles.first_name",
        "user_profiles.last_name",
        "user_profiles.avatar_url",
      ])
      .orderBy("user_accounts.created_at", "desc")
      .orderBy("user_accounts.user_id", "desc")
      .limit(limit + 1);

    // FIX: ugly, will need to refactor - see optimize comment below
    var prevAccountData: { user_id: string; created_at: Date | null }[] = [];

    if (cursor) {
      const cursorDecoded = atob(cursor);
      // TODO: validate decoded cursor format and contents
      const { lastUserId, lastCreatedAt } = JSON.parse(cursorDecoded);

      // TODO: populate db with different created_at fields
      // OPTIMIZE: retireve this cursor and previous cursor in a single query

      var accountData = await query
        // .where("user_accounts.created_at", "<", lastCreatedAt) // causes empty results b/c db_seed data has multiple accounts with same created_at timestamp - need to add secondary sort on user_id and include in cursor to disambiguate
        .where("user_accounts.user_id", "<", lastUserId)
        .execute();

      // FIX
      var prevAccountData = await server.db
        .selectFrom("user_accounts")
        .select(["user_id", "created_at"])
        // .where("created_at", ">", lastCreatedAt)
        .where("user_id", ">", lastUserId)
        .orderBy("created_at", "asc")
        .orderBy("user_id", "asc")
        .limit(limit)
        .execute();
    } else {
      var accountData = await query.execute();
    }

    var data = [];
    for (const account of accountData) {
      data.push({
        user_id: account.user_id,
        username: account.username,
        full_name: `${account.first_name} ${account.last_name}`,
        followers_count: 0, // TODO: calculate followers count
        following_count: 0, // TODO: calculate following count
        avatar_url: account.avatar_url ?? "",
        api_path: `${server.prefix}/${account.user_id}`,
        created_at: account.created_at,
      });
    }

    var next_cursor =
      data.length > limit
        ? btoa(
            JSON.stringify({
              lastUserId: data[data.length - 1]!.user_id,
              lastCreatedAt: data[data.length - 1]!.created_at,
            }),
          )
        : "";

    data = data.slice(0, limit); // trim to limit

    const previous_cursor = prevAccountData
      ? btoa(
          JSON.stringify({
            lastUserId: prevAccountData[prevAccountData.length - 1]?.user_id,
            lastCreatedAt:
              prevAccountData[prevAccountData.length - 1]?.created_at,
          }),
        )
      : "";

    return {
      page: {
        limit: data.length,
        cursor,
        next_cursor,
        previous_cursor,
      },
      data,
    };
  });
}
