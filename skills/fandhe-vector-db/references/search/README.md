# search

| Name | Description | Path |
| --- | --- | --- |
| SearchEngineKind / build | 検索エンジン選択・構築レイヤ（CPU brute-force / HNSW opt-in） | [search-engine.md](./search-engine.md) |
| HnswIndex | HNSW（近似最近傍探索）グラフの構築・検索 | [hnsw.md](./hnsw.md) |
| SparseIndex | BM25 Okapi 転置索引による疎検索 | [sparse.md](./sparse.md) |
| RrfConfig / hybrid_search | 密検索・疎検索の RRF（Reciprocal Rank Fusion）融合 | [hybrid.md](./hybrid.md) |
| Reranker | 検索カーネルのリランキング層（字句一致 / クロスエンコーダ） | [rerank.md](./rerank.md) |
| ScoringBoost | 宣言的スコアリングブースト API | [scoring-boost.md](./scoring-boost.md) |
| PrecisionPolicy | `precision` モードの確信度ゲート | [precision.md](./precision.md) |
| LlmClient / QueryExpansion | LLM クエリプランニング（クエリ展開クライアント層） | [query-planner.md](./query-planner.md) |
| QuestionClass / TieredPlanner | 質問類型推定・ティアリング（対話ティア／高精度ティア振り分け） | [tiering.md](./tiering.md) |
