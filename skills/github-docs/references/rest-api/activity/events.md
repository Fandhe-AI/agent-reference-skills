# Events API

パブリックイベント（プッシュ・Issue・PR 等のアクティビティ）を取得するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/events` | GitHub 全体のパブリックイベント取得 |
| GET | `/networks/{owner}/{repo}/events` | リポジトリネットワークのパブリックイベント取得 |
| GET | `/orgs/{org}/events` | Organization のパブリックアクティビティイベント取得 |
| GET | `/repos/{owner}/{repo}/events` | リポジトリのイベント取得 |
| GET | `/users/{username}/events` | 特定ユーザーが発生させたイベント取得 |
| GET | `/users/{username}/events/orgs/{org}` | 認証ユーザーの Organization ダッシュボードイベント取得 |
| GET | `/users/{username}/events/public` | ユーザーのパブリックイベント取得 |
| GET | `/users/{username}/received_events` | Watch・Follow 経由で受信したイベント取得 |
| GET | `/users/{username}/received_events/public` | 受信したパブリックイベント取得 |

## Notes

- 過去30日以内に作成されたイベントのみが対象。タイムラインは最大300件まで含まれる
- ページネーションは `per_page`（最大100）で制御。デフォルトは多くのエンドポイントで30件、`GET /events` は15件

## Related

- [notifications.md](./notifications.md)
