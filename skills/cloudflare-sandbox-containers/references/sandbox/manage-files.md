---
source: https://developers.cloudflare.com/sandbox/files/manage-files/
---

# Move files in and out of a sandbox

Stream an uploaded file into a Linux sandbox with `Files`, run `gzip` on it with `exec()`, and stream the result back. `Files` does not start the instance, so the Durable Object starts it before each file operation. The "files" guides group: move files, keep a workspace between instances, mount an R2 bucket.

## Signature / Usage

Install and prepare the image (see the sandbox-package page for the full requirement set; the `COPY` tag must match the installed package version):

```sh
npm i @cloudflare/sandbox
```

```dockerfile
FROM node:24-trixie-slim

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

RUN mkdir /workspace
CMD ["sleep", "infinity"]
```

`wrangler.jsonc` additions: `"compatibility_flags": ["nodejs_compat"]` and a `containers` entry with `images.workspace.dockerfile = "./Dockerfile"` (as in the sandbox-package page). Durable Object:

```ts
import { Files } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

const workspace = "/workspace";
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	private readonly container: Container;
	private readonly files: Files;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		this.container = container;
		this.files = new Files(container);

		// A restarted Durable Object sets the timeout again.
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	// Files does not start an instance, so start one before each operation.
	private async startSandbox(): Promise<void> {
		if (!this.container.running) {
			this.container.start({
				image: this.container.images.workspace,
				enableInternet: false,
			});
			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}
	}

	async compress(upload: ReadableStream<Uint8Array>): Promise<Response> {
		await this.startSandbox();
		const name = crypto.randomUUID();

		await this.files.writeFile(name, upload, { cwd: workspace });

		// Runs inside the disposable sandbox container, never on the host.
		const process = await this.container.exec(["gzip", "--force", name], {
			cwd: workspace,
		});
		const output = await process.output();

		if (output.exitCode !== 0) {
			throw new Error(new TextDecoder().decode(output.stderr));
		}

		return this.files.readFile(`${name}.gz`, { cwd: workspace });
	}
}
```

Worker route:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/compress$/.exec(url.pathname);

		if (!match || request.method !== "POST" || !request.body) {
			return new Response("Not found", { status: 404 });
		}

		// Caution: the name comes from the URL, so any caller can reach any sandbox.
		// In production derive it from the authenticated caller.
		const sandbox = env.MY_CONTAINER.getByName(match[1]);
		return sandbox.compress(request.body);
	},
} satisfies ExportedHandler<Env>;
```

Test (on your machine):

```sh
printf 'Ada Lovelace\nGrace Hopper\n' | curl \
  https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/compress \
  --data-binary @- \
  --fail-with-body \
  --output names.txt.gz
```

Accept paths from callers (add to the same class; `Files` does not restrict paths, so check them first):

```ts
import { SandboxFileError } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

const workspace = "/workspace";

// Accept only relative paths that stay inside cwd.
function workspacePath(path: string): string | null {
	if (
		path === "" ||
		path.startsWith("/") ||
		path.includes("\0") ||
		path.split("/").includes("..")
	) {
		return null;
	}

	return path;
}

export class MyContainer extends DurableObject<Env> {
	// ...

	async download(path: string): Promise<Response> {
		const relativePath = workspacePath(path);

		if (!relativePath) {
			return new Response("Invalid path", { status: 400 });
		}

		await this.startSandbox();

		try {
			return await this.files.readFile(relativePath, { cwd: workspace });
		} catch (error) {
			if (SandboxFileError.is(error) && error.code === "ENOENT") {
				return new Response("Not found", { status: 404 });
			}

			throw error;
		}
	}
}
```

## Notes

- `writeFile()` streams the upload and `readFile()` streams the output file; neither holds a whole file in Durable Object memory. `output()` holds only what `gzip` prints. A Linux failure such as a full disk throws `SandboxFileError` with `code` such as `ENOSPC`.
- Other `Files` methods take the same `cwd` option: `readDirectory()`, `stat()`, `mkdir()`, `rename()`, `remove()` (a directory needs `recursive: true`). Compressed files stay in `/workspace` until the instance stops; call `remove()` after the caller has read the response to delete sooner.
- The path check applies only to the request path and does not isolate files inside the sandbox: code there can create a symbolic link in `/workspace` that points elsewhere. The `user` option (`"1000:1000"`) sets ownership of files `Files` creates and does not narrow access.
- Mismatched `cloudflare/sandbox` image tag and package version cause `SandboxProtocolError`. Container start/exec are documented in the `containers` category of this skill.

## Related

- [Files API](./files-api.md)
- [Save and restore a sandbox with snapshots](./save-and-restore-a-workspace.md)
- [Mount an R2 bucket](./mount-an-r2-bucket.md)
- [Sandbox security](./sandbox-security.md)
