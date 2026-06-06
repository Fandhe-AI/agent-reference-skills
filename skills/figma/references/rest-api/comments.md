# Comments

Endpoints for reading, posting, and deleting comments and emoji reactions on Figma files.

## Signature / Usage

```http
GET /v1/files/:key/comments
X-Figma-Token: <token>
```

## Options / Props

### GET Comments

`GET /v1/files/:key/comments` — Returns all comments on a file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | String (path) | File or branch key |
| `as_md` | Boolean (query) | Return comments as markdown |

**Scope:** `file_comments:read` | **Rate Limit:** Tier 2

---

### POST Comment

`POST /v1/files/:file_key/comments` — Posts a new comment on a file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File or branch key |
| `message` | String (body) | Comment text content |
| `comment_id` | String (body, optional) | Root comment ID for replies |
| `client_meta` | Object (body) | Position data: `Vector`, `FrameOffset`, `Region`, or `FrameOffsetRegion` |

**Response:** The posted `Comment` object  
**Scope:** `file_comments:write` | **Rate Limit:** Tier 2

---

### DELETE Comment

`DELETE /v1/files/:file_key/comments/:comment_id` — Deletes a comment.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File or branch key |
| `comment_id` | String (path) | Comment to delete |

**Response:** Empty  
**Scope:** `file_comments:write` | **Rate Limit:** Tier 2

---

### GET Comment Reactions

`GET /v1/files/:file_key/comments/:comment_id/reactions` — Returns emoji reactions on a comment.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File or branch key |
| `comment_id` | String (path) | Target comment |
| `cursor` | String (query) | Pagination cursor |

**Scope:** `file_comments:read` | **Rate Limit:** Tier 2

---

### POST Comment Reaction

`POST /v1/files/:file_key/comments/:comment_id/reactions` — Adds an emoji reaction.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File or branch key |
| `comment_id` | String (path) | Target comment |
| `emoji` | String (body) | Valid emoji shortcode (e.g., `:heart:`) |

**Response:** Empty  
**Scope:** `file_comments:write` | **Rate Limit:** Tier 2

---

### DELETE Comment Reaction

`DELETE /v1/files/:file_key/comments/:comment_id/reactions` — Removes an emoji reaction.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | File or branch key |
| `comment_id` | String (path) | Target comment |
| `emoji` | String (query) | Emoji shortcode to remove |

**Response:** Empty  
**Scope:** `file_comments:write` | **Rate Limit:** Tier 2

## Notes

- A `Comment` object contains: `id`, `client_meta`, `file_key`, `parent_id`, `user`, `created_at`, `resolved_at`, `order_id`, `reactions`
- A `Reaction` object contains: `user`, `emoji` (shortcode format), `created_at`
- Branch keys are accepted wherever file keys are expected

## Related

- [Files](./files.md)
- [Users](./users.md)
