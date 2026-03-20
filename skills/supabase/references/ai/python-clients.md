# Python クライアント

vecs ライブラリを使った Python からのベクトル操作。コレクション管理、ベクトルの upsert・query。

## 概要

`vecs` は Supabase が提供する Python ライブラリで、pgvector を使ったベクトル操作を簡潔に行える。コレクション（ベクトルテーブル）の作成、ベクトルの追加・検索をシンプルな API で提供する。Google Colab や Jupyter Notebook での利用にも適している。

### vecs の特徴

- コレクションベースの抽象化（内部的には PostgreSQL テーブル）
- 自動的にベクトルインデックスを作成
- メタデータフィルタリング対応
- バッチ upsert 対応
- 接続文字列ベースの簡単なセットアップ

## コード例

```python
# === インストール ===
# pip install vecs

import vecs

# === 接続 ===
# Supabase プロジェクトの Database URL を使用
vx = vecs.create_client("postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres")

# === コレクション作成 ===
# 1536 次元のベクトルコレクションを作成
docs = vx.get_or_create_collection(name="documents", dimension=1536)

# === ベクトルの upsert ===
# (id, vector, metadata) のタプルリストで upsert
docs.upsert(
    records=[
        (
            "doc_1",
            [0.0013, -0.0245, 0.0112, ...],  # 1536 次元のベクトル
            {"title": "Introduction to AI", "category": "tech"}
        ),
        (
            "doc_2",
            [0.0042, 0.0198, -0.0067, ...],
            {"title": "Machine Learning Basics", "category": "tech"}
        ),
    ]
)

# === インデックス作成 ===
# コサイン距離でインデックスを作成
docs.create_index(
    method=vecs.IndexMethod.hnsw,
    measure=vecs.IndexMeasure.cosine_distance,
)

# IVFFlat インデックスの場合
docs.create_index(
    method=vecs.IndexMethod.ivfflat,
    measure=vecs.IndexMeasure.cosine_distance,
)

# === クエリ（類似検索） ===
query_vector = [0.0013, -0.0245, ...]  # 1536 次元

results = docs.query(
    data=query_vector,
    limit=10,
    include_value=True,     # 距離値を含める
    include_metadata=True,  # メタデータを含める
)

for result in results:
    print(result)
    # ('doc_1', 0.123, {'title': 'Introduction to AI', 'category': 'tech'})

# === メタデータフィルタリング ===
results = docs.query(
    data=query_vector,
    limit=5,
    filters={"category": {"$eq": "tech"}},
    include_metadata=True,
)

# 複合フィルタ
results = docs.query(
    data=query_vector,
    limit=5,
    filters={
        "$and": [
            {"category": {"$eq": "tech"}},
            {"year": {"$gte": 2023}},
        ]
    },
)
```

```python
# === OpenAI と組み合わせた完全な例 ===
import vecs
import openai

# 接続
vx = vecs.create_client("postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres")
docs = vx.get_or_create_collection(name="documents", dimension=1536)

# ドキュメントの埋め込みと格納
def ingest_documents(texts: list[str], metadatas: list[dict]):
    # OpenAI で埋め込み生成
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=texts,
    )

    records = [
        (f"doc_{i}", emb.embedding, meta)
        for i, (emb, meta) in enumerate(zip(response.data, metadatas))
    ]

    docs.upsert(records=records)

# 検索
def search(query: str, limit: int = 5):
    # クエリを埋め込み
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=query,
    )
    query_embedding = response.data[0].embedding

    return docs.query(
        data=query_embedding,
        limit=limit,
        include_value=True,
        include_metadata=True,
    )
```

```python
# === Google Colab での利用例 ===

# セルでインストール
# !pip install vecs openai

import vecs
import os

# 環境変数またはシークレットから接続情報を取得
# Google Colab のシークレット機能を使う場合:
# from google.colab import userdata
# db_url = userdata.get('SUPABASE_DB_URL')

vx = vecs.create_client(os.environ["SUPABASE_DB_URL"])
docs = vx.get_or_create_collection(name="my_collection", dimension=384)

# コレクション一覧
collections = vx.list_collections()
print(collections)  # ['documents', 'my_collection']

# コレクション削除
# vx.delete_collection("my_collection")

# 接続を閉じる
vx.disconnect()
```

```python
# === supabase-py でのベクトル操作 ===
from supabase import create_client

supabase = create_client(
    "https://[REF].supabase.co",
    "[ANON_KEY]"
)

# RPC 関数を呼び出してセマンティック検索
result = supabase.rpc(
    "match_documents",
    {
        "query_embedding": query_vector,
        "match_threshold": 0.78,
        "match_count": 10,
    }
).execute()

print(result.data)
```

## 注意点

- `vecs` は内部的に `vecs` スキーマにテーブルを作成する（`public` スキーマではない）
- Database URL はダッシュボードの「Settings > Database > Connection string > URI」から取得
- Google Colab ではシークレット機能を使い、接続文字列をコードにハードコードしない
- `upsert` は同じ ID のレコードがあれば更新する。ID はユニークである必要がある
- インデックスは大量データ投入後に作成するのが効率的（特に IVFFlat）
- `vecs` は `supabase-py` とは別のライブラリ。用途に応じて使い分ける
- フィルタ演算子: `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$and`, `$or`

## 関連

- [AI & Vectors 概要](./overview.md)
- [ベクトルカラム](./vector-columns.md)
- [セマンティック検索](./semantic-search.md)
- [外部連携](./integrations.md)
