---
source: https://tanstack.com/router/latest/docs/framework/react/installation/with-router-cli
---

# Router CLI

Standalone CLI (`@tanstack/router-cli`) for generating the route tree file without a bundler plugin. Install first (see `install.md`).

## package.json にスクリプトを登録する

```json
{
  "scripts": {
    "generate-routes": "tsr generate",
    "watch-routes": "tsr watch",
    "build": "npm run generate-routes && ...",
    "dev": "npm run watch-routes && ..."
  }
}
```

| Command | Description |
| --- | --- |
| `tsr generate` | Generates routes based on `tsr.config.json` |
| `tsr watch` | Watches directories and regenerates routes on file changes |

Default config: `./src/routes` routes directory, `./src/routeTree.gen.ts` output, customizable via `tsr.config.json`.

> **警告**: `tsr generate` / `tsr watch` は出力先ファイル（既定 `src/routeTree.gen.ts`）を毎回上書き生成する。手動編集した内容は失われるため、linter/formatter の対象から除外し VSCode 側で read-only 設定にすること。

## Solid で使う場合の tsconfig 設定

```json
// tsconfig.json (Solid only)
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js"
  }
}
```
