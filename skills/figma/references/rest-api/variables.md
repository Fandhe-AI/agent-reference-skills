# Variables

Endpoints for reading and bulk-modifying variables and variable collections in Figma files. Enterprise plan required.

## Signature / Usage

```http
GET /v1/files/:file_key/variables/local
X-Figma-Token: <token>
```

## Options / Props

### GET Local Variables

`GET /v1/files/:file_key/variables/local` — Returns local variables created in a file and remote variables referenced within it.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File or branch key |

**Response:**
```json
{
  "status": 200,
  "error": false,
  "meta": {
    "variables": { "<variableId>": { /* Variable object */ } },
    "variableCollections": { "<collectionId>": { /* Collection object */ } }
  }
}
```

**Scope:** `file_variables:read` | **Rate Limit:** Tier 2 | **Plan:** Enterprise full members only

---

### GET Published Variables

`GET /v1/files/:file_key/variables/published` — Returns variables published from the specified file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | Main file key (not a branch key) |

**Response:** Same structure as GET Local Variables; published variable objects include `subscribed_id` and `key` fields.

**Scope:** `file_variables:read` | **Rate Limit:** Tier 2 | **Plan:** Enterprise full members only

---

### POST Variables

`POST /v1/files/:file_key/variables` — Bulk create, update, and delete variables and collections in a single atomic operation.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File or branch key |
| `variableCollections` | Array (body) | `VariableCollectionChange` objects |
| `variableModes` | Array (body) | `VariableModeChange` objects |
| `variables` | Array (body) | `VariableChange` objects |
| `variableModeValues` | Array (body) | `VariableModeValue` objects |

**Response:**
```json
{
  "status": 200,
  "error": false,
  "meta": {
    "tempIdToRealId": { "<temporaryId>": "<realId>" }
  }
}
```

**Scope:** `file_variables:write` | **Rate Limit:** Tier 3 | **Plan:** Enterprise full members with edit access

## Notes

- Variables store reusable values applied to design properties
- Variables must be **published** after creation via REST API before they can be used in other files
- POST is an atomic operation; partial failures roll back the entire request
- Guests in Enterprise orgs cannot use the Variables API
- `file_variables:write` scope is **not** supported by plan access tokens

## Related

- [Files](./files.md)
- [Scopes](./scopes.md)
