# sql-execution

| Name | Description | Path |
|------|-------------|------|
| exec | SQL 実行計画層。RLS→SCALAR→DISTANCE 順（または HINT ORDER）で `BoundStatement` を実行する本体 | [exec.md](./exec.md) |
| aggregate | `GROUP BY` なし集計 SELECT のストリーミング実行 | [aggregate.md](./aggregate.md) |
| group-by | `GROUP BY <TEXT 列>` 集計の複数行実行 | [group-by.md](./group-by.md) |
| expr-program | 束縛済み式の平坦ステップ列コンパイル・スタック実行 | [expr-program.md](./expr-program.md) |
| scalar-index | スカラー列二次索引の構築・テーブル世代整合キャッシュ・候補削減 | [scalar-index.md](./scalar-index.md) |
| scalar-plan | `WHERE` 条件形状からのスカラー索引利用可否分類 | [scalar-plan.md](./scalar-plan.md) |
| udf-call | 宣言的 UDF 呼び出しの式 AST・束縛・評価 | [udf-call.md](./udf-call.md) |
| arena-cache | SQL 表層専用 `VectorArena` 世代整合キャッシュ | [arena-cache.md](./arena-cache.md) |
| hnsw-cache | DISTANCE 段が参照する HNSW 索引のテーブル世代整合キャッシュ | [hnsw-cache.md](./hnsw-cache.md) |
| hnsw-hybrid | hybrid 密側再取得ループ専用の `SearchProvider` アダプタ | [hnsw-hybrid.md](./hnsw-hybrid.md) |
| sparse-cache | BM25 疎索引のテーブル世代整合キャッシュ | [sparse-cache.md](./sparse-cache.md) |
| visible-cache | 集計クエリ専用の可視行 id 集合キャッシュ | [visible-cache.md](./visible-cache.md) |
