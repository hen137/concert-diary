-- role types
INSERT INTO role_types (role_description) VALUES
    ('Admin'),
    ('User');

-- hash algorithm types
INSERT INTO hash_algorithm_types (algorithm_description) VALUES
    ('SHA256'),
    ('SHA512');

-- relationship types
INSERT INTO relationship_types (type_description) VALUES
    ('Follow'),
    ('Block'),
    ('Mute'),
    ('Friend');

-- series types
INSERT INTO series_types (type_description) VALUES
    ('Standalone'),
    ('Festival'),
    ('Tour'),
    ('Residency');

-- venue types
INSERT INTO venue_types (type_description) VALUES
    ('Stadium'),
    ('Arena'),
    ('Theater/Concert Hall'),
    ('Club'),
    ('Outdoor'),
    ('Festival stage'),
    ('Virtual');

-- event types
INSERT INTO event_types (type_description) VALUES
    ('Concert'),
    ('Meet and Greet'),
    ('Listening Party'),
    ('Festival Appearance'),
    ('Virtual Event');

-- artist types
INSERT INTO artist_types (type_description) VALUES
    ('Solo Artist'),
    ('Band'),
    ('DJ'),
    ('Orchestra'),
    ('Choir');

-- genre types
INSERT INTO genre_types (type_description) VALUES
    ('Rock'),
    ('Pop'),
    ('Hip Hop'),
    ('Jazz'),
    ('Classical'),
    ('Electronic'),
    ('Country'),
    ('Reggae'),
    ('Blues'),
    ('Metal');

-- subgenre types
INSERT INTO subgenres_types (genre_id, type_description) VALUES
    ((SELECT type_id FROM genre_types WHERE type_description = 'Rock'), 'Alternative Rock'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Rock'), 'Hard Rock'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Pop'), 'Synth-pop'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Hip Hop'), 'Trap'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Jazz'), 'Smooth Jazz'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Classical'), 'Baroque'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Electronic'), 'House'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Country'), 'Bluegrass'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Reggae'), 'Dub'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Blues'), 'Delta Blues'),
    ((SELECT type_id FROM genre_types WHERE type_description = 'Metal'), 'Thrash Metal');
