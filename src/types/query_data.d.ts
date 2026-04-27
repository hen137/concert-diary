export interface IUserCursor {
  user_id: string;
  created_at: Date;
}

export interface IUserData {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  // followers_count: number;
  // following_count: number;
  avatar_url: string | null;
  created_at: Date;
}
