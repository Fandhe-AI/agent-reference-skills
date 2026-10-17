# ai

| Name | Description | Path |
|------|-------------|------|
| 埋め込み生成 | テキストや画像をベクトル表現に変換するための各種埋め込みモデルと Supabase での利用方法。 | [embeddings.md](./embeddings.md) |
| ハイブリッド検索 | ベクトル検索（セマンティック検索）と全文検索（キーワード検索）を組み合わせた高精度な検索手法。 | [hybrid-search.md](./hybrid-search.md) |
| 外部連携 | LangChain、LlamaIndex、Amazon Bedrock など主要 AI フレームワークとの Supabase ベクトルストア連携。 | [integrations.md](./integrations.md) |
| AI & Vectors 概要 | Supabase における AI・ベクトル検索機能の全体像。pgvector Extension を中心としたベクトルデータの格納・検索基盤。 | [overview.md](./overview.md) |
| Python クライアント | vecs ライブラリを使った Python からのベクトル操作。コレクション管理、ベクトルの upsert・query。 | [python-clients.md](./python-clients.md) |
| RAG パイプライン | Retrieval-Augmented Generation。ドキュメントの分割・埋め込み・検索・LLM への受け渡しによる、知識ベースを活用した AI 応答生成。 | [rag.md](./rag.md) |
| セマンティック検索 | ベクトル類似度に基づく意味的な検索。match_documents パターンによるクエリベクトルと格納済みベクトルの近傍検索。 | [semantic-search.md](./semantic-search.md) |
| ベクトルカラム | pgvector の `vector(n)` 型カラムの定義・操作方法と距離演算子の使い方。 | [vector-columns.md](./vector-columns.md) |
| ベクトルインデックス | HNSW と IVFFlat の 2 種類のベクトルインデックスによる近似最近傍検索（ANN）の高速化。 | [vector-indexes.md](./vector-indexes.md) |
