# REST API Endpoints

Upstash Vector REST API: authentication, response format and endpoint list. Every SDK method maps onto one of these endpoints.

## Signature / Usage

```shell
curl "${UPSTASH_VECTOR_REST_URL}/upsert" \
  -H "Authorization: Bearer ${UPSTASH_VECTOR_REST_TOKEN}" \
  -d '{"id": "id-0", "vector": [0.87, 0.99]}'
```

## Options / Props

Endpoints (`{namespace}` is optional in the path; the default namespace is the empty string `""`):

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/upsert/{namespace}` | Upsert one vector or an array of vectors |
| `POST` | `/upsert-data/{namespace}` | Upsert raw data (needs an embedding-model index) |
| `POST` | `/update/{namespace}` | Update vector, data or metadata (`metadataUpdateMode`: `OVERWRITE` / `PATCH`) |
| `POST` | `/query/{namespace}` | Query by vector (batch supported; `weightingStrategy` for sparse) |
| `POST` | `/query-data/{namespace}` | Query by raw data (needs an embedding-model index) |
| `GET` | `/fetch/{namespace}` | Fetch by `ids` or `prefix` (prefix returns at most 1000) |
| `GET` | `/random/{namespace}` | Fetch a random vector; `null` if the namespace is empty |
| `GET` | `/range/{namespace}` | Cursor-paginated iteration (`cursor` starts at `"0"`, `limit`, optional `prefix`) |
| `DELETE` | `/delete/{namespace}` | Delete by `ids`, `prefix` or `filter` (filter is an O(N) full scan); returns `deleted` |
| `DELETE` | `/reset/{namespace}` | Empty a namespace without deleting it |
| `GET` | `/info` | Index stats (`vectorCount`, `pendingVectorCount`, `indexSize`, `dimension`, `similarityFunction`, `indexType`) |
| `GET` | `/list-namespaces` | Namespace names (includes `""`) |
| `DELETE` | `/delete-namespace/{namespace}` | Delete a namespace (not the default one) |
| `POST` | `/rename-namespace` | Body `namespace`, `newNamespace`, optional `deleteExisting`; not for the default namespace |
| `POST` | `/resumable-query/{namespace}` | Start a resumable query with a vector |
| `POST` | `/resumable-query-data/{namespace}` | Start a resumable query with data |
| `POST` | `/resumable-query-next` | Fetch the next batch |
| `POST` | `/resumable-query-end` | Stop and release the query |

HTTP status codes:

| Code | Meaning |
| --- | --- |
| `200 OK` | Request accepted and executed |
| `400 Bad Request` | Syntax error, invalid or unsupported command, or execution failure |
| `401 Unauthorized` | Missing or invalid auth token |
| `405 Method Not Allowed` | Only `HEAD`, `GET`, `POST` and `PUT` are allowed |

## Notes

- Success responses carry a single `result` field; errors carry `error` and `status`
- Query / fetch / range flags `includeMetadata`, `includeVectors` and `includeData` default to `false`; `topK` defaults to `10`
- The REST API is the Upstash Vector index endpoint (`UPSTASH_VECTOR_REST_URL`); it is separate from the Upstash Redis REST API
- Source: https://upstash.com/docs/vector/api/get-started and https://upstash.com/docs/vector/api/endpoints/upsert (and sibling endpoint pages) (fetched 2026-11-14; no version pin on the site)

## Related

- [upsert.md](./upsert.md)
- [update.md](./update.md)
- [query.md](./query.md)
- [namespace.md](./namespace.md)
- [resumable-query.md](./resumable-query.md)
