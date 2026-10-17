---
source: https://tailwindcss.com/docs/installation/tailwind-cli
---

# CLI

`@tailwindcss/cli` のビルド実行とフラグ一覧。フラグ表は docs サイトではなく tailwindcss v4.3.3 の `packages/@tailwindcss-cli/src/commands/build/index.ts` の定義が出典。

## 監視付きビルド

```sh
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

docs サイト記載のコマンド。事前に `npm install tailwindcss @tailwindcss/cli` が必要（[install.md](./install.md)）。

## ビルドのフラグ

出典: `tailwindlabs/tailwindcss@v4.3.3` `packages/@tailwindcss-cli/src/commands/build/index.ts`

| Flag | Alias | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `--input` | `-i` | string | — | Input file |
| `--output` | `-o` | string | `-`（stdout） | Output file |
| `--watch` | `-w` | boolean / string | — | Watch for changes and rebuild as needed, and use `always` to keep watching when stdin is closed |
| `--poll` | — | boolean / number | `false` | Use polling instead of filesystem events when watching（値は ms） |
| `--minify` | `-m` | boolean | — | Optimize and minify the output |
| `--optimize` | — | boolean | — | Optimize the output without minifying |
| `--cwd` | — | string | `.` | The current working directory |
| `--map` | — | boolean / string | `false` | Generate a source map |
| `--silent` | — | boolean | — | Suppress non-error output |

`--poll` は CHANGELOG 4.3.3 に「`--watch --poll[=ms]` をサポート」と記載。

## canonicalize サブコマンド

> **注記**: `canonicalize` は docs サイトに記載が無い。以下は v4.3.3 の `packages/@tailwindcss-cli/src/commands/canonicalize/index.ts` の help 定義のみが出典で、挙動の詳細は未確認。

```sh
tailwindcss canonicalize [classes...]
tailwindcss canonicalize --css input.css [classes...]
tailwindcss canonicalize --stream [--css input.css]
```

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--css` | string | — | CSS entry file used to load the Tailwind design system (defaults to `@import "tailwindcss";`) |
| `--format` | string | `text` | Output format（`text` / `json` / `jsonl`） |
| `--stream` | boolean | `false` | Read candidate groups from stdin line by line and write results to stdout |
