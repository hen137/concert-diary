CREATE TABLE role_types (
    role_id                 SERIAL PRIMARY KEY,
    role_description        VARCHAR(50) NOT NULL
);

CREATE TABLE hash_algorithm_types (
    algorithm_id            SERIAL PRIMARY KEY,
    algorithm_description   VARCHAR(20) NOT NULL
);

CREATE TABLE user_accounts (
    user_id                 SERIAL PRIMARY KEY, --UUID?
    role_id                 INT NOT NULL REFERENCES role_types(role_id),
    hash_algorithm_id       INT NOT NULL REFERENCES hash_algorithm_types(algorithm_id),
    username                VARCHAR(50) NOT NULL UNIQUE,
    email                   VARCHAR(254) NOT NULL UNIQUE,
    password_hash           VARCHAR(128) NOT NULL,
    password_salt           VARCHAR(255) NOT NULL,
    active                  BOOLEAN DEFAULT TRUE
    -- datetime_created        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    -- datetime_updated        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- datetime_deactivated    TIMESTAMPTZ NULL,
    -- datetime_reactivated    TIMESTAMPTZ NULL
);

CREATE TABLE relationship_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE user_relationships (
    follower_id             INT NOT NULL REFERENCES user_accounts(user_id),
    following_id            INT NOT NULL REFERENCES user_accounts(user_id),
    relationship_type_id    INT NOT NULL REFERENCES relationship_types(type_id),
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id)
);

CREATE TABLE user_profiles (
    user_id                 INT NOT NULL REFERENCES user_accounts(user_id),
    first_name              VARCHAR(50) NOT NULL,
    last_name               VARCHAR(50) NOT NULL,
    gender                  VARCHAR(20) NULL,
    date_of_birth           DATE NULL,
    phone_number            VARCHAR(20) NULL,
    address_line            VARCHAR(100) NULL,
    city                    VARCHAR(50) NULL,
    region                  VARCHAR(50) NULL,
    postal_code             VARCHAR(20) NULL,
    country                 VARCHAR(50) NULL,
    pfp_url                 VARCHAR(255) NULL
);

CREATE TABLE series_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE series (
    series_id               SERIAL PRIMARY KEY,
    type_id                 INT NOT NULL REFERENCES series_types(type_id),
    series_name             VARCHAR(100) NOT NULL,
    series_description      TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    avg_rating              DECIMAL(2,1) DEFAULT 0.0
);

CREATE TABLE venue_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE venues (
    venue_id                SERIAL PRIMARY KEY,
    type_id                 INT NOT NULL REFERENCES venue_types(type_id),
    venue_name              VARCHAR(100) NOT NULL,
    venue_description       TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    website_url             VARCHAR(255) NULL,
    avg_rating              DECIMAL(2,1) DEFAULT 0.0
);

CREATE TABLE setlists (
    -- setlist.fm id?
    setlist_id              SERIAL PRIMARY KEY,
    setlist_description     TEXT NULL
);

CREATE TABLE event_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE events (
    -- ticketmaster id?
    -- bandsintown id?
    event_id                SERIAL PRIMARY KEY,
    type_id                 INT NOT NULL REFERENCES event_types(type_id),
    venue_id                INT NOT NULL REFERENCES venues(venue_id),
    series_id               INT NOT NULL REFERENCES series(series_id),
    setlist_id              INT NOT NULL REFERENCES setlists(setlist_id),
    event_name              VARCHAR(100) NOT NULL,
    event_begin_date        DATE NOT NULL,
    event_end_date          DATE NULL,
    event_time              TIME NOT NULL,
    event_description       TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    cancelled               BOOLEAN DEFAULT FALSE,
    tickets_required        BOOLEAN DEFAULT TRUE,
    tickets_url             VARCHAR(255) NULL
);

CREATE TABLE artist_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE artists (
    --MBID?
    artist_id               SERIAL PRIMARY KEY,
    type_id                 INT NOT NULL REFERENCES artist_types(type_id),
    artist_name             VARCHAR(100) NOT NULL,
    artist_description      TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    website_url             VARCHAR(255) NULL
);

CREATE TABLE event_reviews (
    review_id               SERIAL PRIMARY KEY,
    event_id                INT NOT NULL REFERENCES events(event_id),
    user_id                 INT NOT NULL REFERENCES user_accounts(user_id),
    rating                  INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text             TEXT NULL,
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE venue_reviews (
    review_id               SERIAL PRIMARY KEY,
    venue_id                INT NOT NULL REFERENCES venues(venue_id),
    user_id                 INT NOT NULL REFERENCES user_accounts(user_id),
    event_id                INT NOT NULL REFERENCES events(event_id),
    rating                  INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text             TEXT NULL,
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_review_likes (
    like_id                 SERIAL PRIMARY KEY,
    review_id               INT NOT NULL REFERENCES event_reviews(review_id),
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE venue_review_likes (
    like_id                 SERIAL PRIMARY KEY,
    review_id               INT NOT NULL REFERENCES venue_reviews(review_id),
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE genre_types (
    type_id                 SERIAL PRIMARY KEY,
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE subgenres_types (
    type_id                 SERIAL PRIMARY KEY,
    genre_id                INT NOT NULL REFERENCES genre_types(type_id),
    type_description        VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE events_artists (
    event_id                INT NOT NULL REFERENCES user_accounts(user_id),
    artist_id               INT NOT NULL REFERENCES user_accounts(user_id),
    PRIMARY KEY (event_id, artist_id)
);

CREATE TABLE groups_members (
    group_id                INT NOT NULL REFERENCES user_accounts(user_id),
    member_id               INT NOT NULL REFERENCES user_accounts(user_id),
    PRIMARY KEY (group_id, member_id)
);

CREATE TABLE artists_genres (
    artist_id               INT NOT NULL REFERENCES user_accounts(user_id),
    genre_id                INT NOT NULL REFERENCES genre_types(type_id),
    PRIMARY KEY (artist_id, genre_id)
);

CREATE TABLE artists_series (
    artist_id               INT NOT NULL REFERENCES user_accounts(user_id),
    series_id               INT NOT NULL REFERENCES series(series_id),
    PRIMARY KEY (artist_id, series_id)
);

CREATE TABLE venues_series (
    venue_id                INT NOT NULL REFERENCES user_accounts(user_id),
    series_id               INT NOT NULL REFERENCES series(series_id),
    PRIMARY KEY (venue_id, series_id)
);
