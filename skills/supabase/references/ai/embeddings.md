# 埋め込み生成

テキストや画像をベクトル表現に変換するための各種埋め込みモデルと Supabase での利用方法。

## 概要

埋め込み（Embedding）は、テキストや画像などの非構造化データを固定長の数値ベクトルに変換したもの。意味的に近いデータは近いベクトルになる。Supabase では以下の方法で埋め込みを生成できる。

### OpenAI Embeddings

最も広く使われる埋め込みモデル。`text-embedding-3-small`（1536次元）と `text-embedding-3-large`（3072次元）が主要モデル。

### Hugging Face

オープンソースモデルを利用可能。Transformers.js を使って Edge Functions 内で直接実行することもできる。

### Supabase AI（Edge Functions 内蔵モデル）

Edge Functions 内で `Supabase.ai` セッションを使い、ビルトインの `gte-small` モデル（384次元）でサーバーサイド埋め込み生成が可能。外部 API コール不要。

### 自動埋め込み（Automatic Embeddings）

テーブルにデータが挿入・更新されたときに自動的に埋め込みを生成するトリガーベースの機能。手動での埋め込み管理が不要になる。

## コード例

```typescript
// === OpenAI で埋め込み生成 ===
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'The quick brown fox jumps over the lazy dog',
});

const embedding = response.data[0].embedding; // number[] (1536次元)

// Supabase に格納
const { error } = await supabase
  .from('documents')
  .insert({
    content: 'The quick brown fox jumps over the lazy dog',
    embedding: JSON.stringify(embedding),
  });
```

```typescript
// === Supabase AI（Edge Functions 内蔵モデル） ===
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  const { input } = await req.json();

  // ビルトインの gte-small モデルを使用（外部 API 不要）
  const session = new Supabase.ai.Session('gte-small');
  const embedding = await session.run(input, {
    mean_pool: true,
    normalize: true,
  });

  return new Response(JSON.stringify({ embedding }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

```typescript
// === Edge Functions で OpenAI 埋め込み + Supabase 格納 ===
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import OpenAI from 'https://esm.sh/openai@4';

serve(async (req) => {
  const { content } = await req.json();

  const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: content,
  });
  const embedding = embeddingResponse.data[0].embedding;

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { error } = await supabase
    .from('documents')
    .insert({ content, embedding });

  if (error) throw error;

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

```sql
-- === 自動埋め込み（トリガーベース） ===
-- ai.automatic_embeddings を使用してテーブルの変更を自動でベクトル化

-- 自動埋め込みの設定（ダッシュボードから設定推奨）
-- 対象テーブル、ソースカラム、埋め込みモデル、出力カラムを指定
select ai.create_vectorizer(
  'public.documents'::regclass,
  destination => 'documents_embeddings',
  embedding => ai.embedding_openai('text-embedding-3-small', 1536),
  chunking => ai.chunking_recursive_character_text_splitter('body')
);
```

## 注意点

- OpenAI の埋め込みモデルは API 呼び出しごとに課金される。大量データの処理にはコスト計算が必要
- `gte-small`（384次元）は軽量だが精度は OpenAI モデルより劣る場合がある。用途に応じて選択
- 埋め込みモデルを変更すると、既存のベクトルとの互換性がなくなる。全データの再埋め込みが必要
- 同じモデル・同じバージョンで生成した埋め込み同士でのみ距離計算が有効
- バッチ処理で大量の埋め込みを生成する場合、API のレート制限に注意
- Edge Functions 内蔵の `Supabase.ai` は Deno ランタイムでのみ利用可能

## 関連

- [AI & Vectors 概要](./overview.md)
- [ベクトルカラム](./vector-columns.md)
- [セマンティック検索](./semantic-search.md)
- [RAG パイプライン](./rag.md)
