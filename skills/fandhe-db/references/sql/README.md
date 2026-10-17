# sql

| Name | Description | Path |
| --- | --- | --- |
| sql (エントリモジュール) | SQL 表層の入口モジュール（TASK-74・SQL-8）。責務境界を定義… | [sql-module.md](./sql-module.md) |
| sql::allowlist | AST 許可リスト検証（TASK-74・SQL-8・ERR-2）。再帰下降で構造を判定… | [allowlist.md](./allowlist.md) |
| sql::copy | COPY プロトコル（`COPY ... FROM STDIN`／`TO STDOUT`）の SQL 表層側実装… | [copy.md](./copy.md) |
| sql::cte | 非再帰 `WITH` 句（CTE）の名前解決・インライン展開（SQL-29 (b)）… | [cte.md](./cte.md) |
| sql::cursor | カーソル（`DECLARE`／`FETCH`／`CLOSE`。WIRE-15・TASK-218）の構文受理… | [cursor.md](./cursor.md) |
| sql::ddl_column_type | SQL 型名の許可リスト構造解析（TASK-202・SQL-23）… | [ddl-column-type.md](./ddl-column-type.md) |
| sql::declarative_predicate | NoSQL `filter` 語彙拡張（範囲比較・`IN`・`OR`。NOSQL-14）の束縛入口… | [declarative-predicate.md](./declarative-predicate.md) |
| sql::describe | Describe（拡張クエリプロトコルの `'D'` 種別 S）が返す結果列メタデータの導出… | [describe.md](./describe.md) |
| sql::explain | `EXPLAIN`（TASK-78・SQL-6）応答の構築。`QUERY PLAN` 単一列へ整形… | [explain.md](./explain.md) |
| sql::lexer | 自作 SQL トークナイザ（TASK-74・SQL-8）。untrusted 入力を線形走査… | [lexer.md](./lexer.md) |
| sql::mode | 取得モード（`recall`／`precision`）の構文解決コア（TASK-161、SQL-12）… | [mode.md](./mode.md) |
| sql::params | 拡張クエリプロトコルの `$n` パラメータ束縛（WIRE-12・TASK-217）… | [params.md](./params.md) |
| sql::parser | SQL 表層の束縛層（TASK-75、SQL-1〜4）。`BoundStatement` へ変換… | [parser.md](./parser.md) |
| sql::plan | SQL 表層の評価順序規則・`HINT ORDER(...)`（TASK-76・SQL-7）… | [plan.md](./plan.md) |
| sql::relation | 複数テーブル参照スコープの束縛基盤（SQL-28・RLS-10、TASK-212）… | [relation.md](./relation.md) |
| sql::scan (wide retrieval scan) | 広域取得（ソートなしフィルタ取得）の実行本体（Issue #454）… | [scan.md](./scan.md) |
| sql::statement_splitter | 簡易クエリプロトコル 1 メッセージのセミコロン区切り複数文の分割（WIRE-16）… | [statement-splitter.md](./statement-splitter.md) |
| sql::transaction | 明示トランザクション `BEGIN`／`COMMIT`／`ROLLBACK`（SQL-31・TASK-221）… | [transaction.md](./transaction.md) |
| sql::using_operation_id | `USING OPERATION_ID '<id>'` 文末句の値型・検証（TASK-80、SQL-10）… | [using-operation-id.md](./using-operation-id.md) |
| sql::using_plan | `USING PLAN('<query>')` 文末句の実行時ディスパッチ（TASK-77、SQL-5）… | [using-plan.md](./using-plan.md) |
| sql::where_negation | WHERE 述語ツリーの否定を葉まで押し下げる純関数群（SQL-24・Issue #1184）… | [where-negation.md](./where-negation.md) |
| sql::where_tree | `WHERE` 句の `OR` 結合・括弧グルーピングの束縛表現と評価（SQL-24・Issue #912）… | [where-tree.md](./where-tree.md) |
