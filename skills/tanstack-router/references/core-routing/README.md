# Core Routing

TanStack Router 固有のファイル/コードベースルーティング概念。React Router の `routes.ts` / `Route` コンポーネントとは別物（API・命名規則ともに非互換）。

| Name | Description | Path |
|------|-------------|------|
| Routing Concepts | Root/index/dynamic/splat/layout/pathless/non-nested route の基本概念 | [routing-concepts.md](./routing-concepts.md) |
| Route Trees | ルートツリーの定義とファイル構造例 | [route-trees.md](./route-trees.md) |
| Route Matching | ルート優先順位ソートとマッチング解決規則 | [route-matching.md](./route-matching.md) |
| File-Based Routing | ファイルシステムベースのルート生成（flat/directory/mixed） | [file-based-routing.md](./file-based-routing.md) |
| Virtual File Routes | 実ファイルを参照したプログラム的ルートツリー構築 | [virtual-file-routes.md](./virtual-file-routes.md) |
| Code-Based Routing | `createRoute` / `addChildren` による手動ルートツリー構築 | [code-based-routing.md](./code-based-routing.md) |
| File Naming Conventions | ファイル名トークン（`$`, `_`, `-`, `(group)`, `[x]` 等）の一覧 | [file-naming-conventions.md](./file-naming-conventions.md) |
| URL Rewrites | 表示 URL と内部解釈 URL の双方向変換設定 | [url-rewrites.md](./url-rewrites.md) |
