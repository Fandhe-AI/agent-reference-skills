# REST API — Fetch File, Images, and Comments

Authenticate with a Personal Access Token and fetch file content, rendered image URLs, and comments in sequence.

```typescript
const TOKEN = process.env.FIGMA_TOKEN!;
const FILE_KEY = "aBcDeFgHiJkLmN"; // from https://www.figma.com/file/:key/...

const headers = { "X-Figma-Token": TOKEN };

// 1. Fetch file document tree (depth=2 to limit response size)
const fileRes = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}?depth=2`,
  { headers }
);
const file = await fileRes.json();
console.log("File name:", file.name);

// 2. Render specific nodes as PNG (scale 2x)
const NODE_IDS = "1:2,1:3"; // comma-separated node IDs
const imageRes = await fetch(
  `https://api.figma.com/v1/images/${FILE_KEY}?ids=${NODE_IDS}&format=png&scale=2`,
  { headers }
);
const { images } = await imageRes.json();
// images: { "1:2": "https://...", "1:3": "https://..." }
console.log("Image URLs:", images);

// 3. Fetch all comments
const commentsRes = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}/comments`,
  { headers }
);
const { comments } = await commentsRes.json();
console.log("Comment count:", comments.length);
```

## Notes

- Set `X-Figma-Token` header for Personal Access Token auth; use `Authorization: Bearer <token>` for OAuth.
- Image URLs returned by `/v1/images/:key` expire after 30 days; re-fetch when needed.
- For very large files, pass `depth` (e.g., `depth=2`) or `ids` to limit the response and avoid 400/500 errors.
- Required scope: `file_content:read` for files and images; `file_comments:read` for comments.
