# Other commands

## turbo ls

```bash
turbo ls [package(s)] [flags]
```

| Option | Description |
|---|---|
| `--affected` | Only affected packages |
| `--output` | `pretty` or `json` |

## turbo scan

> **Deprecated**: `turbo scan` will be removed in a future major version. Running it shows a deprecation warning.

Interactive command for configuring performance optimizations. Configures Git FS Monitor, Remote Caching, version checks, and more.

## turbo info

Displays debug information (version, paths, daemon status, package manager, platform details).

## turbo devtools

Visualizes the package graph in a browser.

| Option | Default | Description |
|---|---|---|
| `--port` | `9876` | Server port |
| `--no-open` | — | Disable automatic browser launch |

## turbo login / logout / link / unlink

```bash
turbo login          # Vercel auth (default provider)
turbo login --manual # manual token entry
turbo login --api=https://acme.com/api    # custom API endpoint
turbo login --login=https://acme.com      # specify the auth token generation endpoint
turbo login --sso-team=slug              # log in with an SSO team
turbo logout         # log out of the Remote Cache provider
turbo link           # link to Remote Cache
turbo link --yes     # skip the confirmation prompt
turbo link --scope=your-team  # scope (team slug for Vercel)
turbo unlink         # unlink
```

## create-turbo

```bash
npx create-turbo@latest [options]
```

| Flag | Description |
|---|---|
| `-m, --package-manager` | Specify the package manager (`npm`, `yarn`, `pnpm`, `bun`) |
| `-e, --example` | Template name or GitHub URL |
| `-p, --example-path` | Path when the GitHub URL's branch name contains a slash |
| `--skip-install` | Skip dependency installation |
| `--skip-transforms` | Skip post-creation code transforms |
| `--turbo-version` | Install a specific turbo version |
| `-v, --version` | Show version |
| `-h, --help` | Show help |

## eslint-config-turbo / eslint-plugin-turbo

Detects environment variables used in code that aren't declared in `turbo.json`'s hashing configuration.

Rule: `turbo/no-undeclared-env-vars`

```json
{
  "rules": {
    "turbo/no-undeclared-env-vars": ["error", { "allowList": ["^ENV_[A-Z]+$"] }]
  }
}
```

## turbo telemetry

Manages anonymous usage data collection.

```bash
turbo telemetry status   # check current telemetry setting
turbo telemetry enable   # enable telemetry
turbo telemetry disable  # disable telemetry
```

## turbo bin

Gets the filesystem path of the `turbo` executable binary. Useful for checking whether it's a global or local install.

```bash
turbo bin
```

## turbo docs

Searches Turborepo documentation from the terminal (minimum version: 2.7.5).

```bash
turbo docs "caching"                              # keyword search
turbo docs "task dependencies" --docs-version 2.8.0  # search docs for a specific version
```

## @turbo/codemod

```bash
npx @turbo/codemod migrate
```

Automated migration for deprecated features. Use `--dry` to preview.

## turbo-ignore (deprecated)

> **Deprecated**: `turbo-ignore` is no longer updated. Use `turbo query affected` instead, which offers more accurate task-level change detection.
