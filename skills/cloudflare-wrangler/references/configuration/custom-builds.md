---
source: https://developers.cloudflare.com/workers/wrangler/custom-builds/
---

# Custom Builds

Custom builds customize how your code is compiled before being processed by Wrangler. Configured by adding a `[build]` section to the Wrangler configuration file.

## Signature / Usage

```jsonc
{
	"build": {
		"command": "npm run build",
		"cwd": "build_cwd",
		"watch_dir": "build_watch_dir"
	}
}
```

```toml
[build]
command = "npm run build"
cwd = "build_cwd"
watch_dir = "build_watch_dir"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `command` | `string` optional | The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used. Run as part of `wrangler dev` and `npx wrangler deploy`. |
| `cwd` | `string` optional | The directory in which the command is executed. |
| `watch_dir` | `string \| string[]` optional | The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory. |

### `WRANGLER_COMMAND` environment variable

When Wrangler runs your custom build command, it sets `WRANGLER_COMMAND` so your build script can detect which Wrangler command triggered the build.

| Value | Wrangler command triggered |
|-------|----------------------------|
| `dev` | `wrangler dev` |
| `deploy` | `wrangler deploy` |
| `versions upload` | `wrangler versions upload` |
| `types` | `wrangler types` |

```bash
#!/bin/bash
if [ "$WRANGLER_COMMAND" = "dev" ]; then
  echo "Building for development..."
  # run a development build
else
  echo "Building for production..."
  # run a production build
fi
```

## Notes

- Wrangler runs esbuild by default as part of `dev` and `deploy`, bundling the project into a single Worker script; the custom build runs before it (see [bundling.md](./bundling.md)).
- Not applicable if you are using the Cloudflare Vite plugin.
- The `build` key is inheritable across environments (see [top-level-keys.md](./top-level-keys.md)).

## Related

- [bundling.md](./bundling.md)
- [bundling-rules.md](./bundling-rules.md)
- [migration-v1-to-v2.md](./migration-v1-to-v2.md)
