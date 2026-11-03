---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/path/
---

# path

`node:path` provides utilities for working with file and directory paths.

## Signature / Usage

```js
import path from "node:path";
path.join("/foo", "bar", "baz/asdf", "quux", "..");
// Returns: '/foo/bar/baz/asdf'
```

## Notes

- Node.js docs: https://nodejs.org/api/path.html

## Related

- [fs](./fs.md)
- [url](./url.md)
