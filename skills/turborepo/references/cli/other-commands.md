# Other commands

## Signature / Usage

```bash
turbo ls [package(s)] [flags]
turbo scan                  # deprecated
turbo info
turbo devtools [--port <port>] [--no-open]
turbo login | logout | link | unlink
turbo telemetry status|enable|disable
turbo bin
turbo docs "<query>" [--docs-version <version>]
npx create-turbo@latest [options]
npx @turbo/codemod [transform] [path] [--dry] [--print]
npx turbo-ignore [workspace] [flags...]   # deprecated
```

## Options / Props

### turbo ls

| Option | Description |
|---|---|
| `--filter` / `-F` | pnpm-style package selectors to narrow the list (same syntax as `turbo run --filter`) |
| `--affected` | Only packages affected by changes on the current branch (between `main` and `HEAD` by default; override with `TURBO_SCM_BASE` / `TURBO_SCM_HEAD`); combined with `--filter`, the intersection |
| `--output` (Experimental) | `pretty` (default) or `json` |

### turbo devtools

| Option | Default | Description |
|---|---|---|
| `--port` | `9876` | Server port |
| `--no-open` | — | Disable automatic browser launch |

### create-turbo

| Flag | Description |
|---|---|
| `-m, --package-manager` | Specify the package manager (`npm`, `yarn`, `pnpm`, `bun`, `nub`, `aube`); runner forms include `pnpm dlx` / `yarn dlx` / `npx` / `bunx` / `nubx` / `aubx create-turbo@latest` |
| `-e, --example` | Template name or GitHub URL |
| `-p, --example-path` | Path when the GitHub URL's branch name contains a slash |
| `--skip-install` | Skip dependency installation |
| `--skip-transforms` | Skip post-creation code transforms |
| `--turbo-version` | Install a specific turbo version |
| `-v, --version` | Show version |
| `-h, --help` | Show help |

### @turbo/codemod: Turborepo 2.x transforms

| Transform | Version | Effect |
|---|---|---|
| `update-versioned-schema-json` | 2.7.5 | Updates `$schema` to the versioned subdomain form (e.g. `https://v2-7-5.turborepo.dev/schema.json`) |
| `update-schema-json-url` | 2.0.0 | Updates a versioned `schema.v1.json` URL to `schema.v2.json` |
| `add-package-names` | 2.0.0 | Adds a `name` to `package.json` in packages without one |
| `clean-globs` | 2.0.0 | Fixes glob patterns invalidated by glob processing changes |
| `migrate-dot-env` | 2.0.0 | Moves `.env` files from the removed `dotEnv` key to `inputs` |
| `rename-output-mode` | 2.0.0 | Renames `outputMode` to `outputLogs` |
| `rename-pipeline` | 2.0.0 | Renames `pipeline` to `tasks` |
| `stabilize-ui` | 2.0.0 | Renames `experimentalUI` to `ui` |

### @turbo/codemod: Turborepo 1.x transforms

| Transform | Version | Effect |
|---|---|---|
| `stabilize-env-mode` | 1.10.0 | `experimentalGlobalPassThroughEnv` -> `globalPassThroughEnv`, `experimentalPassThroughEnv` -> `passThroughEnv` |
| `transform-env-literals-to-wildcards` | 1.10.0 | Escapes env entries that would be ambiguous under the wildcard syntax |
| `set-default-outputs` | 1.7.0 | Adds the previously inferred `dist/**` and `build/**` outputs |
| `migrate-env-var-dependencies` | 1.5.0 | Moves env var dependencies from `dependsOn` / `globalDependencies` to `env` / `globalEnv` |
| `add-package-manager` | 1.1.0 | Adds `devEngines.packageManager` to root `package.json` with the detected package manager and version |
| `create-turbo-config` | 1.1.0 | Creates `turbo.json` from the `"turbo"` key in `package.json` and removes that key |

## Notes

### turbo ls

With no package arguments, the output includes package manager, package count, and all package names and directories; scoped to packages (e.g. `turbo ls web @repo/ui`), it includes name, directory, internal dependencies, and all tasks.

```bash
TURBO_SCM_BASE=development turbo ls --affected --filter=web
```

### turbo scan

> **Deprecated**: `turbo scan` will be removed in a future major version. Running it shows a deprecation warning.

Interactive command for configuring performance optimizations. Configures Git FS Monitor, Remote Caching, version checks, and more.

### turbo info

Displays debug information (version, paths, daemon status, package manager, platform details).

### turbo devtools

Visualizes the package graph in a browser.

### turbo login / logout / link / unlink

```bash
turbo login          # Vercel auth (default provider)
turbo login --manual # manual token entry
turbo login --api=https://acme.com/api    # custom API endpoint
turbo login --login=https://acme.com      # specify the auth token generation endpoint
turbo login --sso-team=slug              # log in with an SSO team
turbo logout         # log out of the Remote Cache provider
turbo link           # link to Remote Cache
turbo link --api=https://example.com  # Remote Cache provider URL
turbo link --yes     # answer yes to all prompts
turbo link --scope=your-team  # scope (team slug for Vercel)
turbo unlink         # unlink
```

### eslint-config-turbo / eslint-plugin-turbo

Detects environment variables used in code that aren't declared in `turbo.json`'s hashing configuration.

Rule: `turbo/no-undeclared-env-vars`

```json
{
  "rules": {
    "turbo/no-undeclared-env-vars": ["error", { "allowList": ["^ENV_[A-Z]+$"] }]
  }
}
```

### turbo telemetry

Manages anonymous usage data collection.

```bash
turbo telemetry status   # check current telemetry setting
turbo telemetry enable   # enable telemetry
turbo telemetry disable  # disable telemetry
```

### turbo bin

Gets the filesystem path of the `turbo` executable binary. Useful for checking whether it's a global or local install.

```bash
turbo bin
```

### turbo docs

Searches Turborepo documentation from the terminal (minimum version: 2.7.5). Results link to the versioned documentation site matching the installed `turbo`; `--docs-version` overrides it.

```bash
turbo docs "caching"                              # keyword search
turbo docs "task dependencies" --docs-version 2.8.0  # search docs for a specific version
```

### @turbo/codemod

```bash
npx @turbo/codemod migrate
npx @turbo/codemod [transform] [path] [--dry] [--print]
```

Automated migration for deprecated features (run your package manager's install first). `migrate` runs all codemods needed to upgrade. `--dry` does a dry run; `--print` prints the changed output.

### turbo-ignore (deprecated)

> **Deprecated**: `turbo-ignore` is deprecated and no longer receives updates. Use `turbo query affected` instead, which offers more accurate task-level change detection (see "Migrating from turbo-ignore" in `query.md`).

Versioning: because `turbo-ignore` usually runs before dependencies are installed, there is no `turbo` binary. It resolves the version by first checking the root `package.json` `devDependencies` / `dependencies` for `turbo`; if absent, it reads `turbo.json`: a `tasks` key selects `turbo@^2`, a v1 `pipeline` key selects `turbo@^1`.

## Related

- [query](./query.md)
- [run](./run.md)
