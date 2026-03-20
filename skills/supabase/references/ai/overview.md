# AI & Vectors 概要

Supabase における AI・ベクトル検索機能の全体像。pgvector Extension を中心としたベクトルデータの格納・検索基盤。

## 概要

Supabase は PostgreSQL の `pgvector` Extension を利用して、ベクトルデータの格納・インデックス作成・類似度検索を提供する。これにより、セマンティック検索、RAG（Retrieval-Augmented Generation）、レコメンデーションなどの AI ワークフローを PostgreSQL 上で直接実現できる。

### pgvector Extension

pgvector は PostgreSQL にベクトル型とベクトル演算を追加する Extension。Supabase では全プロジェクトでデフォルト利用可能。

### ベクトル型

`vector(n)` 型で n 次元のベクトルを格納する。n は埋め込みモデルの出力次元数に合わせる（例: OpenAI text-embedding-3-small は 1536 次元）。

### 距離関数

| 演算子 | 距離関数 | 説明 |
|--------|----------|------|
| `<->` | L2 距離（ユークリッド距離） | 値が小さいほど類似 |
| `<#>` | 内積（Inner Product）の負値 | 値が小さいほど類似（正規化済みベクトル向き） |
| `<=>` | コサイン距離 | 値が小さいほど類似（0〜2 の範囲） |

### Supabase 上での AI ワークフロー

1. **埋め込み生成**: OpenAI / Hugging Face / Supabase AI でテキストをベクトル化
2. **ベクトル格納**: `vector` 型カラムに INSERT
3. **インデックス作成**: HNSW または IVFFlat でパフォーマンス向上
4. **類似度検索**: 距離演算子で近傍検索
5. **アプリケーション統合**: supabase-js / REST API / Edge Functions から利用

## コード例

```sql
-- pgvector Extension を有効化
create extension if not exists vector with schema extensions;

-- ベクトルカラムを持つテーブル作成
create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);

-- コサイン類似度で上位 5 件を検索
select id, content, 1 - (embedding <=> '[0.1, 0.2, ...]'::vector) as similarity
from documents
order by embedding <=> '[0.1, 0.2, ...]'::vector
limit 5;
```

## 注意点

- pgvector は Supabase ダッシュボードの「Extensions」から有効化するか、SQL で `create extension` を実行する
- ベクトルの次元数は最大 2000 次元まで対応（pgvector 0.7.0 以降）
- 大量のベクトルデータにはインデックスが必須。インデックスなしではフルスキャンとなり遅い
- RLS（Row Level Security）はベクトル検索にも適用される
- `vector` 型は `extensions` スキーマに作成することが推奨される

## 関連

- [ベクトルカラム](./vector-columns.md)
- [ベクトルインデックス](./vector-indexes.md)
- [埋め込み生成](./embeddings.md)
- [セマンティック検索](./semantic-search.md)
- [RAG パイプライン](./rag.md)
