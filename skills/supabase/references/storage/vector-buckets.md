# Storage Vectors

ベクトルデータの格納と類似検索を行う Storage Vectors 機能。

## 概要

Supabase Storage Vectors は、ベクトルデータ（エンベディング）をストレージに格納し、類似検索（ベクトル検索）を実行できる機能を提供する。AI/ML アプリケーションにおける画像やテキストのエンベディング管理に適している。

**主な機能:**
- ベクトルデータの保存・取得・削除
- コサイン類似度に基づくベクトル検索（クエリ）
- インデックスによる高速な近似最近傍探索
- メタデータ付きベクトルの管理

**ユースケース:**
- 画像の類似検索
- テキストのセマンティック検索
- レコメンデーション
- 異常検知

## コード例

```typescript
// ===== ベクトルバケットの作成 =====
// ダッシュボードまたは API 経由でベクトルバケットを作成

// ===== ベクトルの保存（putVectors） =====
const { error: putError } = await supabase.storage
  .from('vector-store')
  .putVectors([
    {
      id: 'vec-001',
      vector: [0.1, 0.2, 0.3, 0.4, 0.5], // エンベディングベクトル
      metadata: {
        title: 'Sample Document 1',
        category: 'tech',
        created_at: '2024-01-01',
      },
    },
    {
      id: 'vec-002',
      vector: [0.2, 0.3, 0.4, 0.5, 0.6],
      metadata: {
        title: 'Sample Document 2',
        category: 'science',
        created_at: '2024-01-02',
      },
    },
  ])

// ===== ベクトルの取得（getVectors） =====
const { data: vectors, error: getError } = await supabase.storage
  .from('vector-store')
  .getVectors(['vec-001', 'vec-002'])

console.log(vectors)
// [
//   { id: 'vec-001', vector: [0.1, 0.2, ...], metadata: { title: '...', ... } },
//   { id: 'vec-002', vector: [0.2, 0.3, ...], metadata: { title: '...', ... } },
// ]

// ===== ベクトルの類似検索（queryVectors） =====
const { data: results, error: queryError } = await supabase.storage
  .from('vector-store')
  .queryVectors({
    vector: [0.15, 0.25, 0.35, 0.45, 0.55], // クエリベクトル
    limit: 5, // 返す結果の数
    // filter: { category: 'tech' }, // メタデータによるフィルタリング
  })

console.log(results)
// [
//   { id: 'vec-001', similarity: 0.98, metadata: { ... } },
//   { id: 'vec-002', similarity: 0.85, metadata: { ... } },
// ]

// ===== ベクトルの削除（deleteVectors） =====
const { error: deleteError } = await supabase.storage
  .from('vector-store')
  .deleteVectors(['vec-001', 'vec-002'])

// ===== 実用例: テキストエンベディングの保存と検索 =====
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: '<openai_api_key>' })

// テキストからエンベディングを生成
async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

// ドキュメントの保存
const documents = [
  { id: 'doc-1', text: 'TypeScript is a typed superset of JavaScript.' },
  { id: 'doc-2', text: 'React is a library for building user interfaces.' },
  { id: 'doc-3', text: 'Supabase is an open source Firebase alternative.' },
]

for (const doc of documents) {
  const embedding = await getEmbedding(doc.text)
  await supabase.storage
    .from('vector-store')
    .putVectors([{
      id: doc.id,
      vector: embedding,
      metadata: { text: doc.text },
    }])
}

// 類似ドキュメントの検索
const queryText = 'What is Supabase?'
const queryEmbedding = await getEmbedding(queryText)

const { data: similarDocs } = await supabase.storage
  .from('vector-store')
  .queryVectors({
    vector: queryEmbedding,
    limit: 3,
  })

console.log(similarDocs)
// 類似度の高い順にドキュメントが返される
```

## 注意点

- ベクトルの次元数はバケット内で統一する必要がある
- 大量のベクトルを保存する場合、インデックスの作成がクエリ性能に大きく影響する
- `putVectors` で既存の ID を指定すると上書き（upsert）される
- メタデータはフィルタリングに使えるが、大きなデータの格納には向かない
- この機能は比較的新しく、API が変更される可能性がある
- ベクトル検索の精度はエンベディングモデルの品質に依存する
- 大規模なベクトルデータには `pgvector` 拡張（Database 側）の利用も検討すること

## 関連

- [Storage 概要](./overview.md)
- [アクセス制御](./access-control.md)
- [S3 プロトコル](./s3-protocol.md)
