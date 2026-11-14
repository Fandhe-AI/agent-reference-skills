# PHP and Laravel SDK

`upstash/vector` PHP SDK and the `upstash/vector-laravel` package for Upstash Vector.

## Signature / Usage

```shell
composer require upstash/vector
```

```php
use Upstash\Vector\Index;

$index = Index::fromEnv();
```

```php
use Upstash\Vector\Index;
use Upstash\Vector\DataUpsert;

$index = new Index(
  url: "<UPSTASH_VECTOR_REST_URL>",
  token: "<UPSTASH_VECTOR_REST_TOKEN>",
);

$index->upsertData(new DataUpsert(
  id: '1',
  data: 'The capital of Japan is Tokyo',
));
```

```php
use Upstash\Vector\Index;
use Upstash\Vector\VectorQuery;

$index = new Index(
  url: "<UPSTASH_VECTOR_REST_URL>",
  token: "<UPSTASH_VECTOR_REST_TOKEN>",
);

$results = $index->query(new VectorQuery(
  vector: [0.1, 0.2, ...], // "..." represents the dimension size of your vector index.
  topK: 15, // topK is the limit number of records we want to be returned.
  includeMetadata: true, // (optional) if true the query results will contain metadata.
  includeVectors: true, // (optional) if true the query results will contain the indexed vectors.
  includeData: true, // (optional) if true the query results will contain the string data.
  filter: '', // (optional) if set, the query results will be filtered by the given filter.
));
```

Laravel:

```shell
composer require upstash/vector-laravel
```

```php
use Upstash\Vector\Laravel\Facades\Vector;

Vector::getInfo(); // Fetches the index info.
```

## Options / Props

| Method | Description |
| --- | --- |
| `upsert(new VectorUpsert(id, vector))` / `upsertMany([...])` | Upsert vectors (`createRandomVector(dimensions:)` helper available) |
| `upsertData(new DataUpsert(id, data))` / `upsertDataMany([...])` | Upsert raw data, embedded by the index model |
| `query(new VectorQuery(...))` | Query dense, sparse (`SparseVector`) and hybrid indexes |
| `fetch(new VectorFetch(ids: [...]))` / `fetch(new VectorFetchByPrefix(prefix: ...))` | Fetch by IDs or ID prefix |
| `delete([...ids])` / `delete(new VectorDeleteByPrefix(prefix: ...))` / `delete(new VectorDeleteByMetadataFilter(...))` | Delete by IDs, prefix or metadata filter |
| `getInfo()` / `getNamespaceInfo()` | Index and namespace stats (`vectorCount`, `pendingVectorCount`, `indexSize`, `dimension`, `similarityFunction`) |
| `reset()` / `resetAll()` | `reset()` clears the default namespace only; `resetAll()` clears all namespaces |
| `namespace('name')->...` | Run any of the above in a namespace |
| `listNamespaces()` | List namespaces (also via `IndexInterface` injection in Laravel) |

## Notes

- Laravel: publish config with `php artisan vendor:publish --tag="vector-config"` to define multiple connections in `config/vector.php`
- Source: https://upstash.com/docs/vector/sdks/php/getting-started , https://upstash.com/docs/vector/sdks/php/laravel , https://upstash.com/docs/vector/sdks/php/commands/upsert-data , https://upstash.com/docs/vector/sdks/php/commands/query (fetched 2026-11-14; no version pin on the site)

## Related

- [ts-sdk-overview.md](./ts-sdk-overview.md)
- [python-sdk.md](./python-sdk.md)
- [namespace.md](./namespace.md)
