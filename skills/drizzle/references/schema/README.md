# schema

| Name | Description | Path |
| --- | --- | --- |
| Drizzle schema | Declaring tables, columns, aliasing, camelCase/snake_case mapping, multi-file schemas | [sql-schema-declaration.md](./sql-schema-declaration.md) |
| Indexes & Constraints | default, not null, unique, check, primary key, composite primary key, foreign key, index/uniqueIndex | [indexes-constraints.md](./indexes-constraints.md) |
| Sequences | `pgSequence` — start/max/min value, cycle, cache, increment | [sequences.md](./sequences.md) |
| Views | `pgView`/`pgMaterializedView`, existing views, WITH options, refresh | [views.md](./views.md) |
| Schemas | `pgSchema` namespaces for tables/enums/sequences | [schemas.md](./schemas.md) |
| PostgreSQL extensions | pg_vector (vector/halfvec/sparsevec/bit) and postgis (geometry) column types, indexes, distance helpers | [extensions.md](./extensions.md) |
| Row-Level Security (RLS) | pgPolicy, pgRole, withRLS, Neon/Supabase RLS helpers | [rls.md](./rls.md) |
| Generated Columns | `.generatedAlwaysAs()` stored generated columns | [generated-columns.md](./generated-columns.md) |
| Custom types | `customType()` — dataType, toDriver, fromDriver, codec | [custom-types.md](./custom-types.md) |
| Codecs | Driver-aware cast/normalize transform layer for column values | [codecs.md](./codecs.md) |
