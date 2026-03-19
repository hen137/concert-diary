CREATE TABLE event_reviews (
    review_id               UUID PRIMARY KEY DEFAULT uuidv7(),
    event_id                UUID NOT NULL REFERENCES events(event_id),
    user_id                 UUID NOT NULL REFERENCES user_accounts(user_id),
    rating                  INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text             TEXT NULL,
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE venue_reviews (
    review_id               UUID PRIMARY KEY DEFAULT uuidv7(),
    venue_id                UUID NOT NULL REFERENCES venues(venue_id),
    user_id                 UUID NOT NULL REFERENCES user_accounts(user_id),
    event_id                UUID NOT NULL REFERENCES events(event_id),
    rating                  INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text             TEXT NULL,
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_review_likes (
    like_id                 SERIAL PRIMARY KEY,
    review_id               UUID NOT NULL REFERENCES event_reviews(review_id),
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE venue_review_likes (
    like_id                 SERIAL PRIMARY KEY,
    review_id               UUID NOT NULL REFERENCES venue_reviews(review_id),
    datetime_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
