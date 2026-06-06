# Dev Resources

Endpoints for reading and managing developer-contributed URLs attached to nodes in Figma Dev Mode.

## Signature / Usage

```http
GET /v1/files/:file_key/dev_resources
X-Figma-Token: <token>
```

## Options / Props

### GET Dev Resources

`GET /v1/files/:file_key/dev_resources` — Returns dev resources in a file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | Main file key (not a branch key) |
| `node_ids` | String (query, optional) | Comma-separated node IDs to filter results |

**Response:** Array of `DevResource` objects  
**Scope:** `file_dev_resources:read` | **Rate Limit:** Tier 2

---

### POST Dev Resources

`POST /v1/dev_resources` — Bulk creates dev resources across multiple files.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dev_resources` | Array (body) | Array of `DevResourceCreate` objects |

**Response:**
```json
{
  "links_created": [ /* DevResource objects */ ],
  "errors": [ /* error objects */ ]
}
```

**Scope:** `file_dev_resources:write` | **Rate Limit:** Tier 2

---

### PUT Dev Resources

`PUT /v1/dev_resources` — Bulk updates dev resources across multiple files.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dev_resources` | Array (body) | Array of `DevResourceUpdate` objects |

**Response:**
```json
{
  "links_updated": [ /* DevResource objects */ ],
  "errors": [ /* error objects */ ]
}
```

**Scope:** `file_dev_resources:write` | **Rate Limit:** Tier 2

---

### DELETE Dev Resource

`DELETE /v1/files/:file_key/dev_resources/:dev_resource_id` — Deletes a single dev resource from a file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File key |
| `dev_resource_id` | String (path) | ID of the dev resource to delete |

**Response:** No content  
**Scope:** `file_dev_resources:write` | **Rate Limit:** Tier 2

## Notes

- Dev resources do not require publishing; they are immediately available upon creation
- GET endpoint requires main file key, not a branch key
- POST and PUT operate across multiple files in a single call
- Common use case: automatically linking Figma nodes to Jira tickets or design system documentation

## Related

- [Files](./files.md)
- [Scopes](./scopes.md)
