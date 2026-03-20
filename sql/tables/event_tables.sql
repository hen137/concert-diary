CREATE TABLE setlists (
    -- setlist.fm id?
    setlist_id              UUID PRIMARY KEY DEFAULT uuidv7(),
    setlist_description     TEXT NULL
);

CREATE TABLE events (
    -- ticketmaster id?
    -- bandsintown id?
    event_id                UUID PRIMARY KEY DEFAULT uuidv7(),
    type_id                 INT NOT NULL REFERENCES event_types(type_id),
    venue_id                UUID NOT NULL REFERENCES venues(venue_id),
    series_id               UUID NOT NULL REFERENCES series(series_id),
    setlist_id              UUID REFERENCES setlists(setlist_id),
    event_name              VARCHAR(100) NOT NULL,
    event_begin_date        DATE NOT NULL,
    event_end_date          DATE NULL,
    event_time              TIME,
    event_description       TEXT NULL,
    img_url                 VARCHAR(255) NULL,
    cancelled               BOOLEAN DEFAULT FALSE,
    tickets_required        BOOLEAN DEFAULT TRUE,
    tickets_url             VARCHAR(255) NULL
);
