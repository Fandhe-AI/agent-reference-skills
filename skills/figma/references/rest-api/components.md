# Components & Styles

Endpoints for reading published components, component sets, and styles from team libraries.

## Signature / Usage

```http
GET /v1/teams/:team_id/components
X-Figma-Token: <token>
```

## Options / Props

### Components

| Endpoint | Method + Path | Scope | Tier |
|----------|---------------|-------|------|
| Team Components | `GET /v1/teams/:team_id/components` | `team_library_content:read` | 3 |
| File Components | `GET /v1/files/:file_key/components` | `library_content:read` | 3 |
| Get Component | `GET /v1/components/:key` | `library_assets:read` | 3 |

#### GET Team Components — query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `team_id` | String (path) | Team ID |
| `page_size` | Number (query) | Number of items per page |
| `after` | String (query) | Cursor for next page |
| `before` | String (query) | Cursor for previous page |

**Response:** Paginated list with component metadata: `key`, `file_key`, `node_id`, `thumbnail_url`, `name`, `description`, timestamps, `user`, `containing_frame`

#### GET File Components — path parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | Must be main file key (not a branch key) |

**Response:** Non-paginated list of components with same metadata fields

---

### Component Sets

| Endpoint | Method + Path | Scope | Tier |
|----------|---------------|-------|------|
| Team Component Sets | `GET /v1/teams/:team_id/component_sets` | `team_library_content:read` | 3 |
| File Component Sets | `GET /v1/files/:file_key/component_sets` | `library_content:read` | 3 |
| Get Component Set | `GET /v1/component_sets/:key` | `library_assets:read` | 3 |

---

### Styles

| Endpoint | Method + Path | Scope | Tier |
|----------|---------------|-------|------|
| Team Styles | `GET /v1/teams/:team_id/styles` | `team_library_content:read` | 3 |
| File Styles | `GET /v1/files/:file_key/styles` | `library_content:read` | 3 |
| Get Style | `GET /v1/styles/:key` | `library_assets:read` | 3 |

Team styles include `style_type` and `sort_position` fields; team endpoints support `page_size`, `after`, `before` pagination.

## Notes

- All endpoints are read-only; there is no write API for components or styles
- File endpoints only accept main file keys, not branch keys
- These endpoints cover **published** library assets; local/subscribed components are accessed via file endpoints
- A `Component` represents a published UI element; a `ComponentSet` is a group of variants; a `Style` is a set of reusable properties

## Related

- [Files](./files.md)
- [Library Analytics](./library-analytics.md)
