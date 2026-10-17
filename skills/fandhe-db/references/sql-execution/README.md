# sql-execution

| Name | Description | Path |
|------|-------------|------|
| sql::aggregate | 集計 SELECT（GROUP BY なし・単一行結果）の実行本体… | [aggregate.md](./aggregate.md) |
| sql::arena_cache | SQL 表層（execute_statement_with_cache）専用の VectorArena 世代整合キャッシュ… | [arena-cache.md](./arena-cache.md) |
| sql::check_constraint | CREATE TABLE / ALTER TABLE ADD CHECK の CHECK 制約の意味論検証… | [check-constraint.md](./check-constraint.md) |
| sql::datetime_fn | DATE／TIMESTAMP 向け日時スカラー関数と DATE 算術… | [datetime-fn.md](./datetime-fn.md) |
| sql::ddl | DDL の実行権限ゲートと実行本体… | [ddl.md](./ddl.md) |
| sql::distinct | SELECT DISTINCT・COUNT(DISTINCT) の正準キー化・予算管理… | [distinct.md](./distinct.md) |
| sql::exec | SQL 表層の実行計画層。BoundStatement を RLS→SCALAR→DISTANCE 順で実行… | [exec.md](./exec.md) |
| sql::expr_program | 束縛済み式を平坦なステップ列へコンパイルし線形実行… | [expr-program.md](./expr-program.md) |
| sql::generation_key | 複数テーブルの (table, generation) 集合を鍵とする汎用世代整合キャッシュ… | [generation-key.md](./generation-key.md) |
| sql::group_by | GROUP BY 集計（複数行結果）の実行本体… | [group-by.md](./group-by.md) |
| sql::hnsw_cache | DISTANCE 段が参照する HNSW 索引のテーブル世代整合キャッシュ… | [hnsw-cache.md](./hnsw-cache.md) |
| sql::hnsw_hybrid | hybrid 密側再取得ループ専用の SearchProvider アダプタ… | [hnsw-hybrid.md](./hnsw-hybrid.md) |
| sql::join | INNER / LEFT / RIGHT / FULL JOIN の束縛・実行本体… | [join.md](./join.md) |
| sql::numeric_fn | 数値スカラー関数（ABS / ROUND / MOD / POWER / SQRT 等）の純粋関数実装… | [numeric-fn.md](./numeric-fn.md) |
| sql::order_value | 行スカラー値の並べ替え・グルーピング用比較値と比較規約… | [order-value.md](./order-value.md) |
| sql::partitioned | 分割実行 DML（PARTITIONED [CHUNK n]）の SQL 表層… | [partitioned.md](./partitioned.md) |
| sql::relation_snapshot | テーブル単位の RLS 可視スナップショット RelationSnapshot… | [relation-snapshot.md](./relation-snapshot.md) |
| sql::returning | INSERT / DELETE / UPDATE の RETURNING 句の投影・行組み立て… | [returning.md](./returning.md) |
| sql::scalar_index | スカラー列二次索引の構築・世代整合キャッシュ・候補削減… | [scalar-index.md](./scalar-index.md) |
| sql::scalar_plan | WHERE 条件形状からのスカラー索引利用可否分類… | [scalar-plan.md](./scalar-plan.md) |
| sql::set_op | 集合演算（UNION / INTERSECT / EXCEPT）の束縛・実行本体… | [set-op.md](./set-op.md) |
| sql::sparse_cache | BM25 疎索引のテーブル世代整合キャッシュ… | [sparse-cache.md](./sparse-cache.md) |
| sql::string_fn | 文字列スカラー関数（LOWER / UPPER / SUBSTR 等）の純粋実装… | [string-fn.md](./string-fn.md) |
| sql::subquery | WHERE 句・投影位置のサブクエリを実行前に解決… | [subquery.md](./subquery.md) |
| sql::udf_call | 宣言的 UDF 呼び出しの式 AST・束縛・評価… | [udf-call.md](./udf-call.md) |
| sql::view | 非マテリアライズド VIEW の参照時展開… | [view.md](./view.md) |
| sql::view_buffered | 評価後射影形ビュー（LIMIT・ORDER BY・集計・JOIN を含む本文）の外側処理… | [view-buffered.md](./view-buffered.md) |
| sql::visible_cache | 集計クエリ専用の可視行 id 集合キャッシュ… | [visible-cache.md](./visible-cache.md) |
| sql::window | ウィンドウ関数（ROW_NUMBER / RANK 等と OVER 付き集計）の実行本体… | [window.md](./window.md) |
