# ベクトルカラム

pgvector の `vector(n)` 型カラムの定義・操作方法と距離演算子の使い方。

## 概要

ベクトルカラムは `vector(n)` 型で定義する。`n` は次元数を指定し、利用する埋め込みモデルの出力次元数に合わせる。ベクトルデータは文字列リテラル `'[0.1, 0.2, ...]'` の形式で INSERT / SELECT する。

### 主要な埋め込みモデルと次元数

| モデル | 次元数 |
|--------|--------|
| OpenAI text-embedding-3-small | 1536 |
| OpenAI text-embedding-3-large | 3072 |
| OpenAI text-embedding-ada-002 | 1536 |
| Cohere embed-english-v3.0 | 1024 |
| Supabase gte-small | 384 |

### 距離演算子

| 演算子 | 名称 | インデックス ops クラス | 用途 |
|--------|------|------------------------|------|
| `<->` | L2 距離（ユークリッド距離） | `vector_l2_ops` | 一般的な類似度検索 |
| `<#>` | 内積の負値（Negative Inner Product） | `vector_ip_ops` | 正規化済みベクトルでの高速検索 |
| `<=>` | コサイン距離 | `vector_cosine_ops` | テキスト埋め込みで最も一般的 |

コサイン類似度は `1 - コサイン距離` で計算できる。

## コード例

```sql
-- テーブル作成
create table documents (
  id bigserial primary key,
  title text not null,
  body text,
  embedding vector(1536)
);

-- ベクトルデータの INSERT
insert into documents (title, body, embedding)
values (
  'Introduction to AI',
  'Artificial intelligence is...',
  '[0.0013, -0.0245, 0.0112, ...]'
);

-- コサイン距離で類似検索
select
  id,
  title,
  1 - (embedding <=> query_embedding) as cosine_similarity
from documents, (select '[0.0013, -0.0245, ...]'::vector(1536) as query_embedding) q
order by embedding <=> query_embedding
limit 10;

-- L2 距離で類似検索
select id, title, embedding <-> '[0.0013, -0.0245, ...]'::vector as l2_distance
from documents
order by embedding <-> '[0.0013, -0.0245, ...]'::vector
limit 10;

-- 内積で類似検索（正規化済みベクトル向け）
select id, title, (embedding <#> '[0.0013, -0.0245, ...]'::vector) * -1 as inner_product
from documents
order by embedding <#> '[0.0013, -0.0245, ...]'::vector
limit 10;

-- 既存テーブルにベクトルカラムを追加
alter table documents
add column embedding vector(1536);

-- ベクトルカラムの更新
update documents
set embedding = '[0.0013, -0.0245, ...]'
where id = 1;
```

```typescript
// supabase-js でのベクトル挿入
const { data, error } = await supabase
  .from('documents')
  .insert({
    title: 'Introduction to AI',
    body: 'Artificial intelligence is...',
    embedding: JSON.stringify([0.0013, -0.0245, 0.0112]),
  });

// supabase-js ではベクトル検索に RPC（関数呼び出し）を使う
const { data, error } = await supabase.rpc('match_documents', {
  query_embedding: [0.0013, -0.0245, 0.0112],
  match_threshold: 0.78,
  match_count: 10,
});
```

## 注意点

- 次元数は最大 2000 次元まで（pgvector 0.7.0 以降。それ以前は 1536）
- `vector` 型はデフォルトで `extensions` スキーマに作成される。テーブル定義時に `extensions.vector` と明示する必要がある場合がある
- ベクトルの次元数が異なるカラム同士で距離演算を行うとエラーになる
- NULL ベクトルは距離演算の結果も NULL になる
- supabase-js からベクトルを挿入する際は配列を JSON 文字列に変換する（`JSON.stringify()`）か、配列をそのまま渡す
- 大量データの INSERT には `copy` コマンドやバッチ処理を推奨

## 関連

- [AI & Vectors 概要](./overview.md)
- [ベクトルインデックス](./vector-indexes.md)
- [セマンティック検索](./semantic-search.md)
