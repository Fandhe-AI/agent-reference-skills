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
make setup   # サブモジュール → rustup → lefthook（git hooks）を一括構築
~~~

## Notes

- **位置づけ**: リポジトリ本体は公開。仕様・挙動定義は private リポジトリ `vector-db-spec`（`docs/spec` submodule）が source of truth。Web API・MCP サーバーはこのリポジトリのスコープ外。
- **ステータス**（README 記載時点）: 実装はロードマップ承認待ちで未着手。タスク定義は spec リポジトリの `05-tasks.md`（TASK-66〜TASK-165 の 100 タスク）、マイルストーンは `06-roadmap.md`（MS-1〜MS-6）で管理。ただし本スキルが参照した crate ソース（`fandhe-vector-db-engine` / `fandhe-vector-db-wire-server` 0.1.0）には TASK-66 以降の実装が多数存在しており、README のこの記載は公開時点のスナップショットである可能性がある。
- **注意（`make setup` の内部動作）**: `rustup` が未導入の場合、`make setup` は内部で `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable` を実行する（`Makefile` の `rustup` ターゲット）。取得元スクリプトの内容を事前に確認せずに自動実行する経路のため、CI・自動化環境では rustup を公式手順（https://rustup.rs）で事前導入済みにしておくことを前提とし、`make setup` 実行時にこの curl|sh 経路を経由しないようにする。
- **実装方針（要点）**:
  - 接続プロトコル: PostgreSQL wire protocol v3 互換の自作実装（外部ライブラリへ可能な限り依存しない）。psql / psycopg / node pg が無改造で接続可能なことを実測済み
  - クエリ表層: 標準クエリカタログ C1〜C5 を MVP とする vector 特化 SQL（C6 集計・C7 結合は拡張扱い）。LLM クエリプランニングは専用構文 `USING PLAN(...)` で SQL に露出
  - 検索モード: `recall`（広域・既定）／`precision`（ピンポイント抽出）の切替を提供
  - 広域取得（wide retrieval）: `ORDER BY` / `USING PLAN` を伴わない `SELECT ... [WHERE ...] LIMIT n`（`Statement::Scan`）。ランキング段・取得モードを持たず、可視かつ `WHERE` を満たす行を先頭から `LIMIT` 件返す（順序保証なし・早期終了）
  - クレート構成: `engine`（コアロジック: データロード・検索カーネル・認証・RLS）+ `wire-server`（バイナリ）の workspace 構成
  - 永続化: `redb` ベース（単一ライタ・スナップショット読み取り）
  - 安全性: RLS 相当のテナント境界・fail-closed のエラー契約（SQLSTATE 風 `wire_code`）
  - 検索結果順序: スコア順 Top-k・RRF 融合結果はいずれもスコア降順・同点は id 昇順で決定的。複数テナントを 1 バッチで扱うバッチ検索経路（`batch_search.rs`）では、同点タイブレークは常駐行列の行スロット昇順であり、行を `(tenant_id, id)` キー順で常駐行列へ渡すという事前条件のもとで `(tenant_id, id)` 昇順になる
  - 依存最小方針: 依存の追加・更新は必ずユーザー承認を経て行い、`=x.y.z` 完全固定で管理する
  - バッチ検索の GPU 経路: 一括インデクシング専用のバッチ検索は `wgpu`（=30.0.1・依存追加はオーナー承認済み）による実 GPU バックエンドを持ち、初期化失敗・実行時エラー時は CPU-SIMD 経路へ fail-closed に縮退する。単発クエリ経路は引き続き CPU-SIMD のみ
  - hybrid 検索の疎索引: BM25 疎索引（`SparseIndex`）は転置索引（posting list）＋可視ビットマップ 1 パス走査方式で、RLS 可視集合へ統計（df・N・avgdl）自体を縮約する fail-closed 設計
  - ANN 索引（opt-in）: 既定の検索エンジンは厳密最近傍（brute-force）のまま不変。`SearchEngineKind::Hnsw`（自作 HNSW・依存追加なし）を明示的に選択したときのみ opt-in で有効化される。適用状況は `EXPLAIN` の `engine:` / `ann_plan:` 行で確認できる
- `fandhe-ai` / `fandhe-backend` / `fandhe-frontend` は同 org の別ライブラリで、API はこの crate と無関係。

## Related

- [crate-layout](./crate-layout.md)
- [development-setup](./development-setup.md)
