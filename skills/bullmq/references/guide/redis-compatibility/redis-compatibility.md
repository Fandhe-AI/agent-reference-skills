# Redis Compatibility

BullMQ は Redis 6.2.0 以降に完全対応していますが、すべての Redis 代替サービスが正常に動作するわけではありません。このドキュメントでは公式にサポートされ、定期的にテストされているベンダーを紹介します。

## 対応状況

BullMQ は Redis のコア機能（Lua スクリプト、キー有効期限、Pub/Sub、Streams）に依存しています。そのため、Redis 互換を謳うサービスであっても、これらの機能が完全にサポートされていなければ正常に動作しません。

| Redis バージョン | 互換性 |
|-----------------|--------|
| Redis 6.2.0 以降 | 完全対応 |
| Redis 6.2.0 未満 | 非対応 |

## サポートされる代替サービス

| サービス | 互換性 | 備考 |
|---------|--------|------|
| Redis (公式) | 完全対応 | 6.2.0 以降 |
| Dragonfly | 対応（制限あり） | キュー名に `{curly braces}` 推奨 |
| AWS MemoryDB | 完全対応 | クラスターモードのみ |
| AWS ElastiCache | 対応 | `maxmemory-policy: noeviction` の設定が必要 |

## 必須設定

すべての Redis 互換サービスで以下の設定が必要です:

```
maxmemory-policy noeviction
```

この設定がないと、Redis がメモリ上限に達した際にキーを削除し、BullMQ が正常に動作しなくなります。

## 注意点

- Redis 互換を謳うサービスでも、Lua スクリプトの実行や Streams のサポートが不完全な場合がある
- 新しいバージョンの BullMQ では追加の Redis 機能を使用する可能性があるため、アップグレード時は互換性を確認すること
- 公式にテストされていないサービスでの動作は保証されない

## 関連

- [./dragonfly.md](./dragonfly.md)
- [../redis-hosting/aws-memorydb.md](../redis-hosting/aws-memorydb.md)
- [../redis-hosting/aws-elasticache.md](../redis-hosting/aws-elasticache.md)
- [../going-to-production.md](../going-to-production.md)
