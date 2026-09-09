---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/README.md
---

# overview

fandhe-vector-db（`Fandhe-AI/vector-db`）は Rust 製のローカルファースト・vector 特化クエリ DB。LLM のコンテキスト用途に最適化した「recall（広く候補を返す）」モードを既定とし、ピンポイント抽出用の「precision」モードを備える。

## Signature / Usage

開発環境セットアップの最小コマンド列（README「開発環境構築」より）:

~~~bash
git clone git@github.com:Fandhe-AI/vector-db.git
cd vector-db
make setup   # submodule → rustup → lefthook
~~~

## Notes

- **位置づけ**: リポジトリ本体は公開。仕様・挙動定義は private リポジトリ `vector-db-spec`（`docs/spec` submodule）が source of truth。Web API・MCP サーバーはこのリポジトリのスコープ外。
- **ステータス**（README 記載時点）: 実装はロードマップ承認待ちで未着手。タスク定義は spec リポジトリの `05-tasks.md`（TASK-66〜TASK-165 の 100 タスク）、マイルストーンは `06-roadmap.md`（MS-1〜MS-6）で管理。ただし本スキルが参照した crate ソース（`fandhe-vector-db-engine` / `fandhe-vector-db-wire-server` 0.1.0）には TASK-66 以降の実装が多数存在しており、README のこの記載は公開時点のスナップショットである可能性がある。
- **実装方針（要点）**:
  - プロトコル: PostgreSQL wire protocol v3 の自作実装（外部依存最小）。psql / psycopg / node pg と無改造で接続確認済み
  - クエリ層: vector 特化 SQL。標準カタログ C1〜C5 が MVP、C6（集計）・C7（結合）は拡張扱い
  - 検索モード: `recall`（既定・広い候補）と `precision`（ピンポイント抽出）を切替
  - wide retrieval: `SELECT ... [WHERE ...] LIMIT n` による順序保証なしの早期終了フィルタリング
  - アーキテクチャ: `engine` crate（コアロジック・データロード・検索・認証・RLS）+ `wire-server` バイナリのワークスペース構成
  - 永続化: `redb` ベース（単一ライター・スナップショット読み取り）
  - 安全性: fail-closed なエラー契約を伴う RLS 相当のテナント境界
  - 結果順序: スコア降順 Top-k・RRF 融合結果は同点時 id 昇順で決定的。バッチ検索経路は `(tenant_id, id)` 順
  - 依存方針: 追加には承認が必要。バージョンは完全固定（`=x.y.z`）
  - GPU: `wgpu`（=30.0.1）によるバッチ検索。初期化失敗時は CPU-SIMD へフォールバック
  - ハイブリッド検索の疎索引: BM25 転置索引・1 パス posting list 走査。RLS 可視性を統計へ統合
  - ANN 索引（opt-in）: 自作 HNSW を `SearchEngineKind::Hnsw` で明示的に有効化。既定は総当たり
- `fandhe-ai` / `fandhe-backend` / `fandhe-frontend` は同 org の別ライブラリで、API はこの crate と無関係。

## Related

- [crate-layout](./crate-layout.md)
- [development-setup](./development-setup.md)
