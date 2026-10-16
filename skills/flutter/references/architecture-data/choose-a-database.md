---
source: https://docs.flutter.dev/data-and-backend/persistence/choose-a-database
---

# Choose a database for your Flutter app

Compare Cloud Firestore, Firebase SQL Connect, on-device SQLite, and key-value storage to pick a database; Flutter has no built-in database.

## Signature / Usage

```console
$ flutter pub add cloud_firestore
```

```console
$ flutter pub add firebase_data_connect
```

## Options / Props

| Option | Data model | Data location | Realtime updates | Offline access |
|--------|------------|---------------|------------------|----------------|
| Cloud Firestore | NoSQL documents and collections | Cloud, with a local cache | Yes | Built in (reads and writes) |
| Firebase SQL Connect | Relational (PostgreSQL) | Cloud | Yes | Optional query cache |
| On-device SQLite | Relational | Device by default | Local streams (with `drift`) | Always local |
| Key-value storage | Key-value pairs | Device only | No | Always local |

## Notes

- Cloud Firestore is the recommended default for a scalable cloud database kept in sync across users and devices (chat, collaborative tools, live multiplayer games, offline-first field service). Package `cloud_firestore`; secured with Cloud Firestore Security Rules. Offline persistence is enabled by default on Android and Apple platforms and can be enabled on the web. Firebase's recommended NoSQL database for new apps instead of Firebase Realtime Database, unless the app only needs low-latency synchronization for small, frequent state updates like presence indicators.
- Firebase SQL Connect (formerly Firebase Data Connect) is the recommended default for structured, relational data. Backed by a fully managed PostgreSQL database on Cloud SQL; schema, queries, and mutations are defined in GraphQL, deployed to the server, and called through a generated type-safe Dart SDK from the `firebase_data_connect` package. Capabilities: relational data, strict schema, type-safe generated SDKs, realtime updates, optional query caching, vector search.
- Local: SQLite via `sqflite` (direct SQL) or `drift` (type-safe Dart queries, reactive streams, schema migrations across mobile, desktop, and web). Key-value via `shared_preferences`; for sensitive data such as authentication tokens or encrypted records use `flutter_secure_storage` instead.
- On-device packages store data only on the local device: not synced across devices or preserved on uninstall without a backup or sync service. Use a cloud database if users expect cross-device access.
- You can combine cloud and local storage (e.g. Firestore for shared data plus `shared_preferences` for a dark mode toggle); see Offline-first support. Both cloud options work with Firebase Authentication (`firebase_auth`), Cloud Storage for Firebase (`firebase_storage`), and Firebase AI Logic (`firebase_ai`). Custom backend logic can be written in Cloud Functions for Firebase or backend servers in Dart, sharing a Dart package for models, serialization, and validation.
- This page covers choosing a database from Flutter. Database engines and their own APIs are covered by other skills such as supabase (Postgres/BaaS) and drizzle (TypeScript ORM); they are not Flutter packages.

## Related

- [Firebase](./firebase.md)
- [Persistent storage architecture: SQL](./pattern-sql.md)
- [Persistent storage architecture: Key-value data](./pattern-key-value-data.md)
- [Offline-first support](./pattern-offline-first.md)
