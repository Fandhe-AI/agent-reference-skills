---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/
---

# fs

`node:fs` gives access to a virtual, memory-based file system (VFS) in Workers.

## Signature / Usage

```js
import { readFileSync, writeFileSync } from "node:fs";

const config = readFileSync("/bundle/config.txt", "utf8");

writeFileSync("/tmp/abc.txt", "Hello, world!");
```

Initial directory structure:

```plaintext
/bundle
└── (one file for each module in your Worker bundle)
/tmp
└── (empty, but you can write files, create directories, symlinks, etc)
/dev
├── null
├── random
├── full
└── zero
```

Reading from `/bundle` (always read-only):

```js
import { readFileSync } from "node:fs";

// The config.txt file would be included in your Worker bundle.
// Refer to the Wrangler documentation for details on how to
// include additional files.
const config = readFileSync("/bundle/config.txt", "utf8");

export default {
	async fetch(request) {
		return new Response(`Config contents: ${config}`);
	},
};
```

Writing to `/tmp`:

```js
import { writeFileSync, readFileSync } from "node:fs";

export default {
	fetch(request) {
		// The file `/tmp/hello.txt` will only exist for the duration
		// of this request.
		writeFileSync("/tmp/hello.txt", "Hello, world!");
		const contents = readFileSync("/tmp/hello.txt", "utf8");
		return new Response(`File contents: ${contents}`);
	},
};
```

## Options / Props

Character devices under `/dev`:

| Name | Type | Description |
|------|------|-------------|
| `/dev/null` | device | Discards all data written to it and returns EOF on read. |
| `/dev/random` | device | Provides random bytes on reads and discards writes. Reading is only permitted within the context of a request. |
| `/dev/full` | device | Always returns EOF on reads and discards all data written to it. |
| `/dev/zero` | device | Provides an infinite stream of zero bytes on reads and discards writes. |

Limits:

| Name | Type | Description |
|------|------|-------------|
| Path length | 4096 chars | Maximum total path length including separators; paths are handled as file URLs, so percent-encoding is accounted for (characters that do not need encoding are decoded before the check; an invalid encoding such as `%zz` counts as 3 characters). |
| Path segments | 48 | Maximum number of path segments (`/a/b/c` is 3). |
| File size | 128 MB | Maximum size of an individual file. |

## Notes

- Availability: with `nodejs_compat` and a compatibility date of `2025-09-01` or later, `node:fs` is available by default. For an earlier date, combine `nodejs_compat` with `enable_nodejs_fs_module`. To disable, set `disable_nodejs_fs_module`.
- `/tmp` contents are not persistent and are unique to each request; files created in one request are not available in concurrent or subsequent requests. Symlinks can be created there.
- All VFS operations are synchronous, even when using the callback or promise-based APIs.
- File timestamps are always the Unix epoch (`1970-01-01T00:00:00Z`) (a temporary limitation), so `fs.stat` returns the same timestamp for all files.
- Temporary files are held in memory and count toward the Worker's memory limit; exceeding it terminates and restarts the Worker instance.
- Unsupported or partial: `fs.watch` / `fs.watchFile`; `fs.globSync()` and other glob APIs; the `force` option of `fs.rm`; file permissions and ownership.
- Docs inconsistency: the path-length bullet in the source has mangled inline-code markup around the `%66` / `%zz` example; the meaning is preserved above.
- Node.js docs: https://nodejs.org/api/fs.html

## Related

- [Node.js compatibility](./overview.md)
- [process](./process.md) (`process.cwd()` is initialized to `/bundle`)
- [Compatibility flags (configuration category)](../configuration/README.md)
