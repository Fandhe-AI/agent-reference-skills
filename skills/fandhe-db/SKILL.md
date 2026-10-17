---
name: fandhe-db
description: >
  Rust 製ローカルファースト vector 特化クエリ DB fandhe-db
  (PostgreSQL wire protocol v3 互換) の
  fandhe-db-engine / fandhe-db-wire-server リファレンス。
  USING PLAN / USING OPERATION_ID 構文、DDL / JOIN / CTE / window 関数、
  拡張クエリ・COPY・トランザクション、TLS 1.3 / SCRAM-SHA-256、
  NoSQL HTTP 表層、precision・recall モード、HNSW / BM25 / RRF hybrid / rerank、
  redb 永続化、tenant・RLS、SIMD / wgpu、wire_code エラー契約。
user-invocable: false
---

# fandhe-db

fandhe-db は Rust 製のローカルファースト vector 特化クエリ DB。`fandhe-db-engine`（コアエンジン、SQL 表層・HNSW/BM25/hybrid 検索・redb 永続化・RLS）と `fandhe-db-wire-server`（PostgreSQL wire protocol v3 互換のバイナリ）の 2 crate workspace で構成され、無改造の `psql` / `psycopg` / `pg` クライアントから接続し、`USING PLAN` / `USING OPERATION_ID` 拡張構文を含む SQL を実行できる。0.2.0 の表層は次のとおり。

- SQL: DDL（`CREATE` / `ALTER` / `DROP` の TABLE・VIEW・INDEX・TYPE、制約）、JOIN / CTE / サブクエリ / 集合演算 / ウィンドウ関数
- wire: 明示トランザクション・カーソル・`COPY`・拡張クエリプロトコル、TLS 1.3・SCRAM-SHA-256
- NoSQL: `--surface nosql` で有効化する HTTP/1.1 JSON NoSQL 表層（`POST /v1/session` / `POST /v1/query`）

対象バージョンは `fandhe-db-engine` / `fandhe-db-wire-server` とも crates.io **0.2.0**（2026-10-08 公開、旧名 `fandhe-vector-db-*` 0.1.0 からの改名後初版。tag / release なし、publish commit SHA `dc888f6ea146d3078153d64a6848f5c8cf044431` で pin）。旧名 `fandhe-vector-db-engine` / `fandhe-vector-db-wire-server` の 0.1.0 は crates.io に残るが更新されない。crate 名・環境変数名・`ValidatedInsert` / `BoundInsertForm` の移行は `references/getting-started/migration-0-2.md` を参照。lib 名 `engine` / `wire_server` とバイナリ名 `wire-server` は不変。

公式ドキュメントサイトは存在せず、出典は公開リポジトリ https://github.com/Fandhe-AI/fandhe-db の README・CHANGELOG・`docs/design/` ADR と、crates.io の `.crate` tarball（一次ソース）。docs.rs の `fandhe-db-engine/0.2.0` はレンダリング済み rustdoc ページも取得可能だが、シグネチャの根拠は tarball の `src/` に置く。

**仕様の位置づけ** — 仕様の source of truth は private リポジトリ `Fandhe-AI/fandhe-db-spec`（非公開）にあり、本スキルはそこへアクセスできないため、公開ソース・公開 ADR から追跡できる範囲に限定している。crate ソースの doc comment（rustdoc）は日本語で書かれており、references 本文はそれを日本語で要約し、シグネチャ（型・識別子）部分は英語 verbatim で転記している。private spec 参照 ID のみが残る挙動は各ページ `## Notes` に「spec 非公開のため未記載」と明記している。

**他スキルとの使い分け** — `upstash` は @upstash/vector のマネージド SaaS クライアント（REST ベクター API）、`supabase` は pgvector 拡張・Postgres RLS のクライアント利用であり、いずれもベクター DB エンジン本体ではない。`mssql` / `drizzle` / `supabase` は SQL クライアント / ORM であり、本スキルの SQL 表層（`USING PLAN` 等の拡張構文、DDL・JOIN・CTE・トランザクションの DB 側実装）とは別物。`nosql-surface/` の HTTP JSON 表層は DB エンジンが提供する API であり、`upstash`（SaaS の REST クライアント）や `fandhe-backend`（Rust HTTP サーバーフレームワーク）とは別物。本スキルの `performance/` は CPU SIMD（isa / dispatch）と wgpu 経由の GPU バッチカーネルを扱い、`nvidia-cuda` / `apple-silicon` / `amd-rocm` が担う GPU 言語・ランタイム層（CUDA / MSL / HIP）のリファレンスではない。`fandhe-ai` / `fandhe-backend` / `fandhe-frontend` は同じ fandhe org の別ライブラリで API は無関係、ベクター DB エンジン本体を調べる場合は本スキル（`fandhe-db`）を参照すること。

## ディレクトリ構成

```text
skills/fandhe-db/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      crate-layout.md
      lib.md
      core.md
      error-format.md
      development-setup.md
      migration-0-2.md
      json.md
    sql/
      README.md
      sql-module.md
      lexer.md
      parser.md
      allowlist.md
      using-plan.md
      using-operation-id.md
      mode.md
      explain.md
      plan.md
      scan.md
      copy.md
      cursor.md
      params.md
      statement-splitter.md
      transaction.md
      declarative-predicate.md
      ddl-column-type.md
      where-tree.md
      where-negation.md
      describe.md
      cte.md
      relation.md
    sql-execution/
      README.md
      exec.md
      aggregate.md
      group-by.md
      expr-program.md
      scalar-index.md
      scalar-plan.md
      udf-call.md
      arena-cache.md
      hnsw-cache.md
      hnsw-hybrid.md
      sparse-cache.md
      visible-cache.md
      ddl.md
      check-constraint.md
      view.md
      view-buffered.md
      join.md
      set-op.md
      subquery.md
      window.md
      partitioned.md
      returning.md
      relation-snapshot.md
      generation-key.md
      order-value.md
      distinct.md
      string-fn.md
      numeric-fn.md
      datetime-fn.md
    search/
      README.md
      search-engine.md
      hnsw.md
      sparse.md
      hybrid.md
      rerank.md
      scoring-boost.md
      precision.md
      query-planner.md
      tiering.md
    storage/
      README.md
      storage.md
      row-codec.md
      catalog.md
      txn.md
      recovery.md
      incremental.md
      arena.md
      buffer-pool.md
      constraint.md
      column-rewrite.md
      bytea.md
      uuid.md
      key-index.md
      datetime.md
      numeric.md
      scalar-float.md
    security/
      README.md
      policy.md
      rls.md
      tenant.md
      crypto.md
    wire-server/
      README.md
      main-cli.md
      server.md
      handshake.md
      auth.md
      bind-guard.md
      framing.md
      protocol-dispatch.md
      simple-query.md
      result-encoder.md
      response-buffer.md
      error-response.md
      limits.md
      search-engine-opt.md
      lib.md
      extended-query.md
      binary-param.md
      copy.md
      wire-stream.md
      tls.md
      tls-opt.md
      auth-method-opt.md
      surface.md
      durability-opt.md
      dml-limits-opt.md
      ddl-permission-opt.md
      hnsw-scope-opt.md
    nosql-surface/
      README.md
      overview.md
      session.md
      query-common.md
      op-search.md
      op-scan.md
      op-aggregate.md
      op-insert.md
      op-update-delete.md
      partitioned-dml.md
      ddl.md
      filter.md
      explain.md
      response-schema.md
      sql-nosql-mapping.md
      error-response.md
      http-module.md
    performance/
      README.md
      kernel.md
      isa.md
      dispatch.md
      gpu-batch.md
      batch-search.md
      batch-fallback.md
      batch-limits.md
      parallel-search.md
      f16.md
      sq8.md
    extensions/
      README.md
      wasm-udf.md
      declarative-filter.md
      embedding.md
      chunking.md
      dictionary.md
  samples/
    README.md
    start-wire-server.md
    connect-psql.md
    connect-psycopg.md
    connect-node-pg.md
    connect-extended-query.md
    connect-http-curl.md
    txn-status.md
    e2e-three-client.md
    e2e-three-client-http.md
    e2e-three-client-tls.md
    docker-compose.md
  scripts/
    README.md
    install.md
    make-targets.md
    run-wire-server.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| リポジトリの位置づけ・crate 構成・features・依存、engine クレートルート・`VectorCore`/`EngineCore` コア API、JSON 値、`ErrorClass`/`WireError` の wire_code 写像、開発環境構築・Makefile、0.1.0 → 0.2.0 移行（crate 改名・環境変数改名）を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| SQL 表層のトークナイザ・意味論束縛・AST 許可リスト、`USING PLAN` / `USING OPERATION_ID` / `HINT ORDER` 拡張構文、`recall`/`precision` モード解決、`EXPLAIN` 応答、DDL 列型、CTE、リレーション、WHERE 木・否定、トランザクション文、カーソル、`COPY`、バインドパラメータ、文分割を知りたい | sql | [references/sql/README.md](references/sql/README.md) |
| SQL 実行計画本体（RLS→SCALAR→DISTANCE 順）、集計・`GROUP BY`、DDL 実行・CHECK 制約、VIEW、JOIN、集合演算、サブクエリ、ウィンドウ関数、`RETURNING`、`DISTINCT`、文字列・数値・日時関数、式ステップコンパイル、スカラー二次索引、宣言的 UDF 呼び出し、世代整合キャッシュを知りたい | sql-execution | [references/sql-execution/README.md](references/sql-execution/README.md) |
| 検索エンジン選択・構築、HNSW 近似最近傍探索、BM25 転置索引、RRF hybrid 融合、リランキング、宣言的スコアリングブースト、precision 確信度ゲート、LLM クエリプランニング・ティアリングを知りたい | search | [references/search/README.md](references/search/README.md) |
| redb ベース永続化層、行エンコーダー、スキーマカタログ、制約・列書き換え、列型（bytea / uuid / numeric / datetime / float）、キー索引、トランザクションハンドル、障害回復・commit_boundary・ledger、増分インデックス反映、ベクトルアリーナ、バッファプールを知りたい | storage | [references/storage/README.md](references/storage/README.md) |
| テナント境界・可視性文脈の構築判定、RLS 暗黙適用フックと可視行限定検索、行ストア統合層の参照実装、パスワード・鍵の暗号処理を知りたい | security | [references/security/README.md](references/security/README.md) |
| wire-server バイナリの CLI フラグ・起動、接続受け付けループ、StartupMessage/認証フロー、Argon2id・SCRAM-SHA-256 認証方式、TLS 1.3、メッセージフレーミング、簡易クエリ・拡張クエリプロトコル、バイナリパラメータ、`COPY`、応答バイト列生成、ErrorResponse 横断写像、タイムアウト・同時接続数制御、`--surface` 選択、各種 `*-opt` 起動オプションを知りたい | wire-server | [references/wire-server/README.md](references/wire-server/README.md) |
| `--surface nosql` の HTTP/1.1 JSON NoSQL 表層、`POST /v1/session` / `POST /v1/query` の op 別 JSON スキーマ（search / scan / aggregate / insert / update・delete / DDL / explain）、filter、レスポンススキーマ、SQL との対応、エラー射影を知りたい | nosql-surface | [references/nosql-surface/README.md](references/nosql-surface/README.md) |
| 検索カーネル境界・CPU 参照実装、SIMD 実行時検出・ディスパッチ決定表、wgpu GPU バッチ検索、CPU-SIMD への縮退フォールバック、一括投入上限、並列 Top-k、f16/i8(SQ8) 量子化を知りたい | performance | [references/performance/README.md](references/performance/README.md) |
| WASM UDF サンドボックス実行契約、宣言的メタデータフィルタ、埋め込み変換注入点、チャンク分割、シンボル・タームインデックス抽出を知りたい | extensions | [references/extensions/README.md](references/extensions/README.md) |
| wire-server の起動方法、無改造 psql/psycopg/pg クライアントからの接続例、拡張クエリ接続、HTTP（curl）接続、トランザクション状態、3 クライアント e2e ハーネス（wire / HTTP / TLS）、Docker 開発環境など典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| 開発環境構築・Makefile タスク・wire-server 起動コマンドなどインストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
