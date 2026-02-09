# Concert Diary API

This project aims to be the engine enabling the development of [APP NAME], inspired by communities like Letterboxd, for music enjoyers and concert goers. [APP NAME] will make a commitment to developing a dedicated user experience CONTINUE

## Features (Planned)

- User Authentication: secure login and authorization using auth.js
- Event and Venue Search: 
- Rate and Review:
- 

## Tech Stack

- Node.js: the javascript runtime environment that enables the development and production web servers
- pnpm: 
- Fastify: A typescript forward web framework, chosen for its significant performance gains over other Node.js frameworks
- PostgreSQL: 

### Why not use Supabase or some other BaaS?

Well, simply put... to learn! API + backend design is a beast, but infinitly flexible if done the right way. Ensuring a robust and scalable design is critical for efficient development, but can only be realised when a service is decoupled from specific, often limiting, infrastructures. [APP NAME] will need to take advantage of external APIs to populate and seed the database which will enable the suite of features that are planned, and equally importantly, increase data collection rates and testing quality. Furthermore, one of [APP NAME]'s goals is to directly contribute to the open source MusicBrainz community with artist, venue, and show "edits". This is maximally accomplished with direct control over the system.

## External API's that enable [APP NAME]

- [Ticketmaster's Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) for event and venue discovery 
- [Bandsintown API](https://help.artists.bandsintown.com/en/articles/7053475-what-is-the-bandsintown-api) for artist and event discovery
- [Setlist.fm API](https://api.setlist.fm/docs/1.0/index.html) for setlist data
- [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API) for standardizing data integrity about artists, shows, venues, etc.

## copyright stuff