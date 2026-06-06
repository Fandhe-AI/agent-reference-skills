# samples

| Name | Description | Path |
|------|-------------|------|
| Composition in Pages | 同一レイヤー間の直接依存を避け、上位レイヤー（pages/widgets）で features と entities を合成するパターン。 | [composition-in-pages.md](./composition-in-pages.md) |
| Cross-Entity Import | entities 間の正当なクロススライス依存を `@x` 記法で明示的に管理する。 | [cross-entity-import.md](./cross-entity-import.md) |
| Layer Imports | 上位レイヤーは下位レイヤーからのみインポートできる一方向依存ルールの実例。 | [layer-imports.md](./layer-imports.md) |
| Next.js App Router Integration | Next.js App Router と FSD を併用するディレクトリ構成とページ再エクスポートパターン。 | [nextjs-app-router.md](./nextjs-app-router.md) |
| Project Structure | FSD の基本ディレクトリ構成を示す最小構成例。 | [project-structure.md](./project-structure.md) |
| React Query Integration | entities の `api` セグメントにクエリファクトリを置き、pages から利用するパターン。 | [react-query-integration.md](./react-query-integration.md) |
| Slice Groups | 関連スライスをフォルダでまとめつつ、スライス間の分離を維持するパターン。 | [slice-groups.md](./slice-groups.md) |
| Slice Public API | スライスの `index.ts` で公開インターフェースを定義し、内部パスへの直接インポートを防ぐ。 | [slice-public-api.md](./slice-public-api.md) |
