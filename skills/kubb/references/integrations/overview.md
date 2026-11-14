# Integrations overview

Kubb を Studio・CI・ビルド中のいずれかから実行する。各連携は共有の `kubb.config.ts` を使う。

## Signature / Usage

ビルドツール連携は `kubb` に同梱の `unplugin-kubb` 経由で、`kubb.config.ts` を単一の `config` オブジェクトとして受け取り、ツールのビルド時に生成する。

| 区分 | 連携 | 内容 |
|------|------|------|
| Studio | Kubb Studio | ローカルプロジェクトを Studio に接続し、生成ファイルをブラウザーでレビュー |
| CI | CI snapshots | 任意の CI からインストール可能な Studio スナップショットを公開 |
| CI | GitHub Actions | GitHub Actions からスナップショットを公開し、生成ファイルの変更をレビュー |
| CI | GitLab CI | GitLab CI からスナップショットを公開し、生成ファイルの変更をレビュー |
| TypeScript | openapi-import | `*.openapi.yaml` を TypeScript で import し、plugin の出力を型チェック（experimental） |
| Build tools | Vite / webpack / Rollup / Rolldown / Rspack / esbuild / Farm / Nuxt / Astro | それぞれ `kubb/vite` `kubb/webpack` `kubb/rollup` `kubb/rolldown` `kubb/rspack` `kubb/esbuild` `kubb/farm` `kubb/nuxt` `kubb/astro` から import |

```text
kubb/vite  kubb/webpack  kubb/rollup  kubb/rolldown  kubb/rspack
kubb/esbuild  kubb/farm  kubb/nuxt  kubb/astro
```

上記は原文の各カード（「Import from `kubb/<tool>`.」）に記載された import パス。import 形式（default / named）は原文のオーバービューには記載がないため未記載。ビルドツール別の例は [unplugin.md](../helpers/unplugin.md) を参照。`config` を省略すると、連携は CLI と同様に `kubb.config.ts` を読み込む。

### Import a spec

ビルドツール連携では `*.openapi.yaml` / `*.openapi.yml` を import すると、config の全 plugin の出力が 1 つのモジュールとして得られる。import に対して生成ファイルは書かれない。`input` の無い config はこの import だけを扱う。

```ts
import { type Pet, petStatusEnum } from './petStore.openapi.yaml'
```

plugin が別ファイルに書くコード（バンドルされた client ランタイム等）は含まれない。`tsc` とエディターで型を得るには [openapi-import.md](./openapi-import.md) を参照。

## Notes

- Source: https://kubb.dev/docs/5.x/integrations/overview （kubb@5.20.0 の docs/5.x/integrations/overview.md、取得日 2026-11-14）
- Vite・Nuxt・Astro はビルド時のみ生成する。開発サーバーを起動する前に `kubb generate` を実行する
- バンドラー連携は `defineConfig` と同じ既定値を適用し、ビルド中に `output.format` / `output.lint` / `output.postGenerate` を実行する。サマリーは表示するが `json` / `file` / `html` reporter は実行しない（原文は reference/configuration の Defaults を参照）
- Migration (5.11 → 5.20): the 5.11.0 docs said bundler integrations apply fewer defaults than the CLI (no Markdown parser, no reporters, no `output.postGenerate`); the 5.20.0 docs state the opposite for defaults and `postGenerate` as above. The changelog records generating once per build in every bundler (5.9.0, #4266) and the `kubb generate` summary after a build (5.9.4, #4293), but not the defaults change itself.
- 本ページはオーバービュー。ビルドツール別ページ（vite / webpack / rollup / rolldown / rspack / esbuild / farm / nuxt / astro）はこのカテゴリには含まれない

## Related

- [studio.md](./studio.md)
- [ci.md](./ci.md)
- [github-actions.md](./github-actions.md)
- [gitlab.md](./gitlab.md)
- [openapi-import.md](./openapi-import.md)
- [unplugin.md](../helpers/unplugin.md)
