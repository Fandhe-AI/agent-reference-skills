---
source: https://developers.cloudflare.com/workers/wrangler/commands/
---

# Global flags

Every Wrangler command page on the official docs repeats the same collapsible "Global flags" block. It is recorded here once; per-command pages in this reference list only command-specific flags and link here.

## Signature / Usage

```sh
npx wrangler <COMMAND> [SUBCOMMAND] --config ./wrangler.jsonc --env staging
```

## Options / Props

| Flag | Type | Alias | Default | Description |
| --- | --- | --- | --- | --- |
| `--version` | boolean | `-v` | — | Show version number |
| `--cwd` | string | — | — | Run as if Wrangler was started in the specified directory instead of the current working directory |
| `--config` | string | `-c` | — | Path to Wrangler configuration file |
| `--env` | string | `-e` | — | Environment to use for operations, and for selecting .env and .dev.vars files |
| `--env-file` | string | — | — | Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files |
| `--install-skills` | boolean | — | false | Install Cloudflare skills for detected AI coding agents before running the command |
| `--profile` | string | — | — | Use a specific auth profile |

## Notes

- Corrected from the official docs: the official pages list the aliases as `--v` (alias `--version`), `--c` and `--e`. The real Wrangler short aliases are single-dash `-v`, `-c` and `-e` (the legacy Wrangler v1 configuration page also writes `--env` or `-e`), so this reference lists `--version` with alias `-v`, and `-c` / `-e` for `--config` / `--env`.
- Some command pages in the official docs omit this block (e.g. subcommands that do not read a configuration file may list a reduced set); where a page shows a different set, that page states it.

## Related

- [Commands overview](./overview.md)
- [General commands](./general.md)
