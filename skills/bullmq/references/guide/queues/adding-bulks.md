# BullMQ — Adding Jobs in Bulk

Adding jobs in bulk with `addBulk` can be faster because it reduces roundtrips to the backend. Whether a bulk add is atomic depends on the SDK and backend (see Notes).

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

## Notes

- Bulk-add atomicity depends on the SDK and backend (v6.7.6 official page):
  - PostgreSQL: the TypeScript, Python, and .NET SDKs add a batch in a single database transaction, so a failed batch is rolled back. Elixir does this for standard jobs when `pipeline: true` (the default), but adds delayed or prioritized jobs individually. Setting `pipeline: false` also adds all jobs individually. If a later Elixir addition fails in these cases, earlier jobs may remain committed; check the queue before retrying.
  - Redis: do not assume that a failed bulk call added no jobs. TypeScript, Rust, and .NET pipeline individual job additions; Elixir may split standard jobs across transactions and adds delayed or prioritized jobs sequentially. Python and PHP group additions in a Redis transaction, but Redis does not roll back commands that fail during execution. A failure can therefore leave some jobs added; check the queue before retrying.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/queues/adding-bulks.md (tag v6.7.6, fetched 2026-11-14). The v6.3.15 page said the call can only succeed or fail with all or none of the jobs added.
- Per-job options (`delay`, `priority`, etc.) can be set on each job.

## Related

- [Queues](./queues.md)
- [Add Bulk API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#addbulk)
