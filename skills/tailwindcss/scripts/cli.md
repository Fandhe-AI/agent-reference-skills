---
source: https://tailwindcss.com/docs/installation/tailwind-cli
---

# CLI

Build command and flag list for `@tailwindcss/cli`. The flag table is sourced not from the docs site but from the definition in `packages/@tailwindcss-cli/src/commands/build/index.ts` of tailwindcss v4.3.3.

## Build with watch mode

```sh
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

Command as written on the docs site. Requires `npm install tailwindcss @tailwindcss/cli` beforehand ([install.md](./install.md)).

## Build flags

Source: `tailwindlabs/tailwindcss@v4.3.3` `packages/@tailwindcss-cli/src/commands/build/index.ts`

| Flag | Alias | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `--input` | `-i` | string | — | Input file |
| `--output` | `-o` | string | `-` (stdout) | Output file |
| `--watch` | `-w` | boolean / string | — | Watch for changes and rebuild as needed, and use `always` to keep watching when stdin is closed |
| `--poll` | — | boolean / number | `false` | Use polling instead of filesystem events when watching (value in ms) |
| `--minify` | `-m` | boolean | — | Optimize and minify the output |
| `--optimize` | — | boolean | — | Optimize the output without minifying |
| `--cwd` | — | string | `.` | The current working directory |
| `--map` | — | boolean / string | `false` | Generate a source map |
| `--silent` | — | boolean | — | Suppress non-error output |

The CHANGELOG for 4.3.3 states that `--watch --poll[=ms]` is supported.

## canonicalize subcommand

> **Note**: `canonicalize` is not documented on the docs site. The following is sourced only from the help definition in `packages/@tailwindcss-cli/src/commands/canonicalize/index.ts` of v4.3.3; detailed behavior is unconfirmed.

```sh
tailwindcss canonicalize [classes...]
tailwindcss canonicalize --css input.css [classes...]
tailwindcss canonicalize --stream [--css input.css]
```

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--css` | string | — | CSS entry file used to load the Tailwind design system (defaults to `@import "tailwindcss";`) |
| `--format` | string | `text` | Output format (`text` / `json` / `jsonl`) |
| `--stream` | boolean | `false` | Read candidate groups from stdin line by line and write results to stdout |
