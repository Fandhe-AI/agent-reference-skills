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
| Build tools | Vite / webpack / Rollup / Rolldown / Rspack / esbuild / Farm / Nuxt / Astro | それぞれ `kubb/vite` `kubb/webpack` `kubb/rollup` `kubb/rolldown` `kubb/rspack` `kubb/esbuild` `kubb/farm` `kubb/nuxt` `kubb/astro` から import |

```text
kubb/vite  kubb/webpack  kubb/rollup  kubb/rolldown  kubb/rspack
kubb/esbuild  kubb/farm  kubb/nuxt  kubb/astro
```

上記は原文の各カード（「Import from `kubb/<tool>`.」）に記載された import パス。import 形式（default / named）は原文のオーバービューには記載がないため未記載。ビルドツール別の例は [unplugin.md](../helpers/unplugin.md) を参照。

## Notes

- 出典: https://kubb.dev/docs/5.x/integrations/overview （kubb@5.11.0 の docs/5.x/integrations/overview.md）
- Vite・Nuxt・Astro はビルド時のみ生成する。開発サーバーを起動する前に `kubb generate` を実行する
- バンドラー連携は CLI より適用される既定値が少ない: Markdown パーサーなし、reporters なし、`output.postGenerate` コマンドなし（原文は reference/configuration の Defaults を参照）
- 本ページはオーバービュー。ビルドツール別ページ（vite / webpack / rollup / rolldown / rspack / esbuild / farm / nuxt / astro）はこのカテゴリには含まれない

## Related

- [studio.md](./studio.md)
- [ci.md](./ci.md)
- [github-actions.md](./github-actions.md)
- [gitlab.md](./gitlab.md)
- [unplugin.md](../helpers/unplugin.md)
