# BullMQ — Adding Jobs in Bulk

`addBulk` メソッドを使用して、複数のジョブを一括追加する。バックエンドへのラウンドトリップが削減されるため高速になる。一括追加の原子性は SDK とバックエンドに依存する（下記「注意点」）。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

const name = 'jobName';
const jobs = await queue.addBulk([
  { name, data: { paint: 'car' } },
  { name, data: { paint: 'house' } },
  { name, data: { paint: 'boat' } },
]);
```

## addBulk のパラメータ

配列の各要素は以下のプロパティを持つ:

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | ジョブ名 |
| `data` | `object` | ジョブデータ |
| `opts` | `JobsOptions` | ジョブオプション（任意） |

## 利点

- **パフォーマンス**: バックエンドへのラウンドトリップが削減され、複数ジョブの同時追加時に効率的
- **原子性は条件付き**: PostgreSQL では TypeScript / Python / .NET が 1 バッチを単一トランザクションで追加するが、Redis では失敗したバルク呼び出しが 0 件追加であるとは仮定できない（下記）

## Notes

- 一括追加の原子性は SDK とバックエンドで異なる（v6.7.6 の公式記述）:
  - PostgreSQL: TypeScript / Python / .NET は 1 バッチを単一の DB トランザクションで追加するため、失敗したバッチはロールバックされる。Elixir は `pipeline: true`（既定）の標準ジョブのみ同様で、delayed / prioritized ジョブは個別に追加する。`pipeline: false` も全ジョブを個別に追加する。これらのケースで後続の追加が失敗すると、先のジョブがコミット済みのまま残る場合があるため、再試行前にキューを確認する
  - Redis: TypeScript / Rust / .NET は個別のジョブ追加をパイプライン化する。Elixir は標準ジョブを複数トランザクションに分割し、delayed / prioritized ジョブは逐次追加する。Python / PHP は追加を Redis トランザクションにまとめるが、Redis は実行中に失敗したコマンドをロールバックしない。したがって失敗時に一部のジョブだけが追加されている可能性があり、再試行前にキューを確認する
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/queues/adding-bulks.md (tag v6.7.6、取得日 2026-11-14)。旧記述（「all or none」）は v6.3.15 時点の公式文
- 各ジョブに個別のオプション（`delay`, `priority` 等）を設定可能

## Related

- [Queues](./queues.md)
- [Add Bulk API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#addbulk)
