CREATE TABLE user_relationships (
    follower_id             UUID NOT NULL REFERENCES user_accounts(user_id),
    following_id            UUID NOT NULL REFERENCES user_accounts(user_id),
    relationship_type_id    INT NOT NULL REFERENCES relationship_types(type_id),
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id)
);

CREATE TABLE events_artists (
    event_id                UUID NOT NULL REFERENCES events(event_id),
    artist_id               UUID NOT NULL REFERENCES artists(artist_id),
    PRIMARY KEY (event_id, artist_id)
);

CREATE TABLE groups_members (
    group_id                UUID NOT NULL REFERENCES user_accounts(user_id),
    member_id               UUID NOT NULL REFERENCES user_accounts(user_id),
    PRIMARY KEY (group_id, member_id)
);

CREATE TABLE artists_series (
    artist_id               UUID NOT NULL REFERENCES artists(artist_id),
    series_id               UUID NOT NULL REFERENCES series(series_id),
    PRIMARY KEY (artist_id, series_id)
);

CREATE TABLE venues_series (
    venue_id                UUID NOT NULL REFERENCES venues(venue_id),
    series_id               UUID NOT NULL REFERENCES series(series_id),
    PRIMARY KEY (venue_id, series_id)
);

CREATE TABLE artists_genres (
    artist_id               UUID NOT NULL REFERENCES artists(artist_id),
    genre_id                INT NOT NULL REFERENCES genre_types(type_id),
    PRIMARY KEY (artist_id, genre_id)
);
