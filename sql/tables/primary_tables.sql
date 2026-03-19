CREATE TABLE series (
    series_id               UUID PRIMARY KEY DEFAULT uuidv7(),
    type_id                 INT NOT NULL REFERENCES series_types(type_id),
    series_name             VARCHAR(100) NOT NULL,
    series_description      TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    avg_rating              DECIMAL(2,1) DEFAULT 0.0
);

CREATE TABLE venues (
    venue_id                UUID PRIMARY KEY DEFAULT uuidv7(),
    type_id                 INT NOT NULL REFERENCES venue_types(type_id),
    venue_name              VARCHAR(100) NOT NULL,
    venue_description       TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    website_url             VARCHAR(255) NULL,
    avg_rating              DECIMAL(2,1) DEFAULT 0.0
);

CREATE TABLE artists (
    --MBID?
    artist_id               UUID PRIMARY KEY DEFAULT uuidv7(),
    type_id                 INT NOT NULL REFERENCES artist_types(type_id),
    artist_name             VARCHAR(100) NOT NULL,
    artist_description      TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    website_url             VARCHAR(255) NULL
);
