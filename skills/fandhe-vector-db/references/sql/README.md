# sql

| Name | Description | Path |
| --- | --- | --- |
| sql (エントリモジュール) | SQL 表層の入口。`SqlOutcome` 応答種別と cache stats の re-export | [sql-module.md](./sql-module.md) |
| lexer | SQL テキストのトークナイザ。`Token` / `Keyword` / `tokenize` | [lexer.md](./lexer.md) |
| parser | 意味論的検証・束縛層。`BoundStatement` / `bind_in_session` / 集計・広域取得の束縛型 | [parser.md](./parser.md) |
| allowlist | AST 許可リスト検証。`Statement` / `ValidatedStatement` / `validate_sql` / 許可関数一覧 | [allowlist.md](./allowlist.md) |
| using-plan | `USING PLAN('<query>')` の LLM クエリ展開束縛（TASK-77・SQL-5） | [using-plan.md](./using-plan.md) |
| using-operation-id | `USING OPERATION_ID '<id>'` の値型・検証（TASK-80・SQL-10） | [using-operation-id.md](./using-operation-id.md) |
| mode | `recall`／`precision` 取得モードの構文解決（TASK-161・SQL-12） | [mode.md](./mode.md) |
| explain | `EXPLAIN` 応答の構築（TASK-78・SQL-6） | [explain.md](./explain.md) |
| plan | `HINT ORDER(...)` 評価順序規則（TASK-76・SQL-7） | [plan.md](./plan.md) |
| scan (wide retrieval scan) | ソートなしフィルタ取得の実行本体（Issue #454） | [scan.md](./scan.md) |
