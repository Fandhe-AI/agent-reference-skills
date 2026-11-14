# REST API: URL Groups

Upsert endpoints, get, list, remove endpoints and delete URL Groups (REST path segment `topics`) through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/v2/topics/{urlGroupName}/endpoints` | Add endpoints; creates the group if missing |
| `GET` | `/v2/topics` | List URL Groups |
| `GET` | `/v2/topics/{urlGroupName}` | Get a URL Group (404 if unknown) |
| `DELETE` | `/v2/topics/{urlGroupName}/endpoints` | Remove endpoints by `name` or `url` |
| `DELETE` | `/v2/topics/{urlGroupName}` | Delete the group and all its endpoints |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path and body definitions.

```bash
curl -X POST "https://qstash.upstash.io/v2/topics/my-group/endpoints" \
  -H "Authorization: Bearer <QSTASH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"endpoints":[{"name":"service-a","url":"https://service-a.example.com/hook"}]}'
```

## Options / Props

### Upsert / remove body

| Name | Type | Description |
| --- | --- | --- |
| `endpoints` | array | Array of `{ url, name? }`; for removal either `name` or `url` must be given |

### Get / list response fields

| Name | Description |
| --- | --- |
| `name` | URL Group name |
| `createdAt` | Unix ms |
| `updatedAt` | Unix ms |
| `endpoints` | Endpoints (`name`, `url`) |

## Notes

- Publishing to a group uses `POST /v2/publish/{urlGroupName}` (see `api-messages.md`); one message is created per endpoint.
- SDK equivalent: `url-groups.md`. The REST resource name is `topics`; messages report the group as `topicName`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/url-groups/upsert-url-group-and-endpoint , https://upstash.com/docs/qstash/api-reference/url-groups/get-a-url-group , https://upstash.com/docs/qstash/api-reference/url-groups/list-url-groups , https://upstash.com/docs/qstash/api-reference/url-groups/remove-endpoints , https://upstash.com/docs/qstash/api-reference/url-groups/delete-a-url-group (fetched 2026-11-14; no version pin on the site)

## Related

- [url-groups.md](./url-groups.md)
- [api-messages.md](./api-messages.md)
