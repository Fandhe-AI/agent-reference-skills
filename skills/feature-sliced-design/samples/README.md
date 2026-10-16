# samples

| Name | Description | Path |
|------|-------------|------|
| Composition in Pages | 同一レイヤーのスライス同士（features 間）は直接インポートできないため、上位レイヤーの pages で合成するパターン。 | [composition-in-pages.md](./composition-in-pages.md) |
| Cross-Entity Import | entities 間の正当なクロススライス依存を `@x` 記法で明示的に管理する。 | [cross-entity-import.md](./cross-entity-import.md) |
| Layer Imports | 上位レイヤーは下位レイヤーからのみインポートできる一方向依存ルールの実例。 | [layer-imports.md](./layer-imports.md) |
| Next.js App Router Integration | Next.js App Router と FSD を併用するディレクトリ構成とページ再エクスポートパターン。FSD の `app` / `pages` レイヤーは `_app` / `_pages` に改名して競合を避ける。 | [nextjs-app-router.md](./nextjs-app-router.md) |
| Project Structure | FSD の基本ディレクトリ構成を示す最小構成例。 | [project-structure.md](./project-structure.md) |
| React Query Integration | TanStack Query のクエリファクトリを `shared/api` に置き、Public API 経由で pages から利用するパターン。 | [react-query-integration.md](./react-query-integration.md) |
| Slice Groups | 関連スライスをフォルダでまとめて見通しを良くするパターン。スライス間の分離ルールは変わらない。 | [slice-groups.md](./slice-groups.md) |
| Slice Public API | スライスの `index.ts` で公開インターフェースを定義し、内部パスへの直接インポートを防ぐ。 | [slice-public-api.md](./slice-public-api.md) |
