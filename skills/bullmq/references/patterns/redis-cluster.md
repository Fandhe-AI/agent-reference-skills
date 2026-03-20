# Redis Cluster

Redis Cluster 環境で BullMQ を使用するパターン。ハッシュタグを使って関連するキーが同じハッシュスロットに配置されるように設定する。

## 背景

BullMQ の内部処理では複数のキーにまたがるアトミック操作が必要。これは Redis Cluster のルールに反するが、ハッシュタグを使うことで対応可能。ハッシュタグは括弧 `{}` 内の文字列を使ってハッシュスロットの配置を決定する。

## 基本的な使い方

キュープレフィックスにハッシュタグを使用する方法:

```typescript
const queue = new Queue('cluster', {
  prefix: '{myprefix}',
});
```

またはキュー名自体をハッシュタグで囲む方法:

```typescript
const queue = new Queue('{cluster}');
```

## 注意点

- 同じクラスタ内で複数キューを使用する場合、異なるプレフィックスを使用してキューをクラスタノードに均等に分散させること。パフォーマンスとメモリ使用量の向上が期待できる
- Worker にも同じプレフィックス（またはキュー名）を使用する必要がある
- ハッシュタグにより、BullMQ の Lua スクリプトが必要とするすべてのキーが同じノードに配置される

## 関連

- [./failing-fast-when-redis-is-down.md](./failing-fast-when-redis-is-down.md)
- [Redis Cluster Tutorial](https://redis.io/topics/cluster-tutorial)
