---
source: https://developers.cloudflare.com/sandbox/reference/files/
---

# Files API

`Files` reads and changes files and directories in a running container. It does not start or stop the container. Each method runs the `sandbox-shim` helper through `exec()` (so it operates inside the disposable sandbox container, not on the host).

## Signature / Usage

```ts
import { Files } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject<Env> {
	private readonly files: Files;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		if (!ctx.container) {
			throw new Error("No container is configured");
		}
		// ctx.container stays the same object while the Durable Object runs.
		this.files = new Files(ctx.container);
	}

	// The container must already be running.
	async readInput(): Promise<Response> {
		await this.files.mkdir("/workspace", { recursive: true });
		await this.files.writeFile("/workspace/input.txt", "hello\n");
		return this.files.readFile("/workspace/input.txt");
	}
}
```

```ts
new Files(container: Pick<Container, "exec">)
```

## Options / Props

`FileOperationOptions` (accepted by every method):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cwd | string | — | Absolute directory that resolves a relative path. For `rename()`, resolves both paths. |
| user | string | image user | Numeric `uid:gid`, such as `"1000:1000"`. Passed to `exec()`. A user ID alone, or a name, throws `TypeError`. |
| signal | AbortSignal | — | Cancels the operation and kills its helper. Rejects with the abort reason (`AbortError` / `TimeoutError`). A signal firing after completion has no effect. Cancellation can leave partial effects. |
| recursive | boolean | false | `mkdir()` and `remove()` only. `mkdir`: create missing parents. `remove`: required for a directory. |
| force | boolean | — | `remove()` only. A missing target resolves instead of rejecting with `ENOENT`. |

Methods:

| Method | Signature | Description |
| --- | --- | --- |
| readFile | `(path, options?) => Promise<Response>` | Status 200, no `Content-Type`; body streams with backpressure. Errors after open error the body. |
| writeFile | `(path, content: FileContent, options?) => Promise<void>` | Creates or truncates, then streams content. Parent must exist (`ENOENT`); a directory at path gives `EISDIR`. |
| stat | `(path, options?) => Promise<SandboxFileStat>` | Follows a trailing symlink. |
| lstat | `(path, options?) => Promise<SandboxFileStat>` | Does not follow; `type` is `"symlink"`, `size` is link target length. |
| readDirectory | `(path, options?) => Promise<SandboxDirectoryEntry[]>` | Immediate entries, unsorted, no `.`/`..`, not recursive. File gives `ENOTDIR`; non-UTF-8 name gives `EILSEQ`. |
| mkdir | `(path, options?: MkdirOptions) => Promise<void>` | Existing path gives `EEXIST` (unless a directory with `recursive: true`). |
| rename | `(source, destination, options?) => Promise<void>` | Linux rules; replaces existing file; non-empty dir gives `ENOTEMPTY`; across filesystems `EXDEV`; no copy fallback. |
| remove | `(path, options?: RemoveOptions) => Promise<void>` | Symlink removed, not target. Directory needs `recursive: true` (else `EISDIR` even with `force`). |

Types: `FileContent = string | ArrayBuffer | ArrayBufferView | Blob | ReadableStream<Uint8Array>` (string written as UTF-8). `SandboxFileType` is `"file" | "directory" | "symlink" | "blockDevice" | "characterDevice" | "fifo" | "socket"`.

`SandboxFileStat` fields: `type` (SandboxFileType), `size` (bigint), `mode` (number, includes type bits, e.g. `0o100644`), `uid`, `gid` (number), `accessedAt`, `modifiedAt`, `changedAt` (Date).

`SandboxDirectoryEntry` fields: `name` (string), `type` (SandboxFileType).

Errors:

| Error | Fields | When |
| --- | --- | --- |
| SandboxFileError | `name`, `code` (Linux name or `UNKNOWN`), `operation`, `path`, `destination` (rename only), `detail` | Linux rejected the operation. Message: `<operation> '<path>': <detail>`. Use `SandboxFileError.is(error)`, not `instanceof`. |
| SandboxProtocolError | `name`, `code` = `"SANDBOX_PROTOCOL_ERROR"`, `detail` | Exchange with the helper failed (for example mismatched image tag). Use `.is(error)`. |
| TypeError | — | Invalid path, `cwd`, or option. |
| Error from exec() | — | Container not running, or image lacks `/usr/local/bin/sandbox-shim`. |

## Notes

- Paths: absolute, or relative to `cwd` (which must be absolute). Empty paths or null characters throw `TypeError` before the helper starts. `Files` does not restrict which paths a caller can open: validate caller-supplied paths yourself (see the manage-files page).
- `JSON.stringify()` and `Response.json()` throw for `bigint`; convert `size` with `Number()` or `String()`. `bigint` and `Date` pass through Durable Object RPC unchanged.
- `text()`, `json()`, `arrayBuffer()`, `blob()` load the whole file into memory; stream `body` for large files.
- Write to a temporary path and `rename()` to avoid readers seeing partial files:

```ts
await files.writeFile(`${path}.partial`, content, { cwd });
await files.rename(`${path}.partial`, path, { cwd });
```

- Each `readDirectory()` starts one process; for large trees one `container.exec(["find", directory])` is faster.
- Requirements: see the sandbox-package page. `exec()` is documented in the `containers` category of this skill.

## Related

- [@cloudflare/sandbox package](./sandbox-package.md)
- [Move files in and out of a sandbox](./manage-files.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
