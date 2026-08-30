---
name: mssql
description: >
  mssql (node-mssql, Node.js 向け Microsoft SQL Server クライアント) の API リファレンス。
  tedious / msnodesqlv8 ドライバー、SQL Server / T-SQL / TDS 接続、ConnectionPool、
  `sql.query` タグ付きテンプレート、bulk insert、Table-Valued Parameter (TVP)、
  prepared statement、isolation level、Diagnostics Channel、Azure AD 認証、CLI。
user-invocable: false
---

# mssql API リファレンス

mssql (node-mssql) — tediousjs 製の Node.js 向け Microsoft SQL Server クライアント（対象バージョン v12.7.0）。
tedious / msnodesqlv8 ドライバー、ConnectionPool、Request / Transaction / PreparedStatement による
T-SQL 実行、データ型・エラー処理・診断を中核とする API 設計・実装時に参照する。

## ディレクトリ構成

```text
skills/mssql/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      sql-server-prerequisites.md
      connect-string-example.md
      config-object-example.md
      windows-authentication-msnodesqlv8.md
    configuration/
      README.md
      general-options.md
      connection-string-formats.md
      azure-ad-connection-string.md
    drivers/
      README.md
      tedious.md
      msnodesqlv8.md
    connections/
      README.md
      connection-pools.md
      global-connection-pool.md
      global-pool-single-instance.md
      advanced-pool-management.md
      result-value-manipulation.md
      connection-validation.md
      events.md
      connect.md
      close.md
      pool-properties.md
      parse-connection-string.md
    requests/
      README.md
      request.md
      execute.md
      input.md
      output.md
      replace-input.md
      replace-output.md
      to-readable-stream.md
      pipe.md
      query.md
      batch.md
      bulk.md
      cancel.md
    transactions/
      README.md
      transaction.md
      begin.md
      commit.md
      rollback.md
      prepared-statement.md
      prepared-statement-input.md
      prepared-statement-output.md
      prepare.md
      prepared-statement-execute.md
      unprepare.md
    data-types-results/
      README.md
      data-types.md
      json-support.md
      geography-geometry.md
      table-valued-parameter.md
      response-schema.md
      affected-rows.md
      duplicate-column-names.md
      metadata.md
    errors-diagnostics/
      README.md
      errors.md
      error-codes.md
      detailed-sql-errors.md
      informational-messages.md
      sql-injection.md
      diagnostics-channel.md
    migration/
      README.md
      version-changes.md
  samples/
    README.md
    config.md
    async-await.md
    promises-queries.md
    promises-stored-procedures.md
    tagged-template-literals.md
    callbacks.md
    streaming.md
    global-connection-pool.md
    global-pool-single-instance.md
    advanced-pool-management.md
    transaction.md
    prepared-statement.md
    bulk-insert.md
    table-valued-parameter.md
    diagnostics-opentelemetry.md
  scripts/
    README.md
    install.md
    cli.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール手順・接続の最初の一歩を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| 接続文字列・config オプションを調べたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Azure AD 認証の接続文字列形式を知りたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| tedious / msnodesqlv8 ドライバーの違い・追加オプションを知りたい | drivers | [references/drivers/README.md](references/drivers/README.md) |
| ConnectionPool の作成・イベント・プロパティを調べたい | connections | [references/connections/README.md](references/connections/README.md) |
| 接続文字列のパース (`parseConnectionString`) を知りたい | connections | [references/connections/README.md](references/connections/README.md) |
| クエリ実行・`sql.query` タグ付きテンプレート・バルク挿入を知りたい | requests | [references/requests/README.md](references/requests/README.md) |
| ストアドプロシージャの入出力パラメーターを扱いたい | requests | [references/requests/README.md](references/requests/README.md) |
| トランザクション・isolation level・commit/rollback を扱いたい | transactions | [references/transactions/README.md](references/transactions/README.md) |
| prepared statement を用意・実行したい | transactions | [references/transactions/README.md](references/transactions/README.md) |
| SQL Server データ型・TVP・JSON/Geography 結果を扱いたい | data-types-results | [references/data-types-results/README.md](references/data-types-results/README.md) |
| クエリ結果の recordset / rowsAffected / metadata を調べたい | data-types-results | [references/data-types-results/README.md](references/data-types-results/README.md) |
| エラークラス・エラーコード・SQL インジェクション対策を知りたい | errors-diagnostics | [references/errors-diagnostics/README.md](references/errors-diagnostics/README.md) |
| Diagnostics Channel での OpenTelemetry トレーシングを知りたい | errors-diagnostics | [references/errors-diagnostics/README.md](references/errors-diagnostics/README.md) |
| 旧バージョンからの破壊的変更を確認したい | migration | [references/migration/README.md](references/migration/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
