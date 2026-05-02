export interface IUserCursor {
  user_id: string;
  // created_at: Date;
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

export interface IVenueCursor {
  venue_id: string;
}

export interface IVenueData {
  venue_id: string;
  venue_name: string;
  location: string;
  capacity: number | null;
}

export interface IEventCursor {
  event_id: string;
}

export interface IEventData {
  event_id: string;
  event_name: string;
}

export interface ISeriesCursor {
  series_id: string;
}

export interface ISeriesData {
  series_id: string;
  series_name: string;
}

export interface IArtistCursor {
  artist_id: string;
}

export interface IArtistData {
  artist_id: string;
  artist_name: string;
}
