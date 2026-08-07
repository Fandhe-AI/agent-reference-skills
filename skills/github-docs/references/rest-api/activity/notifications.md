# Notifications API

認証ユーザーの通知（Issue・PR・メンション等）を取得・既読化するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/notifications` | 通知一覧取得（最新更新順） |
| PUT | `/notifications` | 全通知を既読にする |
| GET | `/notifications/threads/{thread_id}` | 単一通知スレッドの取得 |
| PATCH | `/notifications/threads/{thread_id}` | スレッドを既読にする |
| DELETE | `/notifications/threads/{thread_id}` | スレッドを「完了」にする |
| GET | `/notifications/threads/{thread_id}/subscription` | スレッドの購読状態取得 |
| PUT | `/notifications/threads/{thread_id}/subscription` | スレッドの購読設定変更 |
| DELETE | `/notifications/threads/{thread_id}/subscription` | スレッドをミュート |
| GET | `/repos/{owner}/{repo}/notifications` | リポジトリの通知一覧取得 |
| PUT | `/repos/{owner}/{repo}/notifications` | リポジトリの全通知を既読にする |

## Notes

- classic PAT は `notifications` または `repo` スコープが必要。Issue・コミット関連の情報を取得する場合は `repo` スコープが必要

## Related

- [events.md](./events.md)
- [watching.md](./watching.md)
