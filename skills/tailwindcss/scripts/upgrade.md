---
source: https://tailwindcss.com/docs/upgrade-guide
---

# Upgrade

`@tailwindcss/upgrade`, the migration tool from v3 to v4.

## Run the upgrade tool

> **Warning**: This rewrites files. The docs recommend running it in a new branch, reviewing the diff, and testing in the browser. Assume a throwaway branch and a clean working tree.

```sh
npx @tailwindcss/upgrade
```

Automates updating dependencies, migrating the config file to CSS, and changing template files (as stated in the docs). Requires Node.js 20 or later.

## Flags

Source: `tailwindlabs/tailwindcss@v4.3.3` `packages/@tailwindcss-upgrade/src/index.ts` (not covered by the docs site)

| Flag | Alias | Description |
| --- | --- | --- |
| `--config` | `-c` | Path to the configuration file |
| `--help` | `-h` | Display usage information |
| `--force` | `-f` | Force the migration |
| `--version` | `-v` | Display the version number |

```sh
npx @tailwindcss/upgrade --help
```

Passing files as positional arguments limits the target CSS; when omitted, `**/*.css` under the current directory is searched (per the source implementation). Without `--force`, the tool exits with an error if the git working tree is dirty (same source).
