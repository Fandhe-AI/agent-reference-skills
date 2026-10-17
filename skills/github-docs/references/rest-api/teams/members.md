# Team Members API

team のメンバーシップを管理する REST API。出典: https://docs.github.com/en/rest/teams/members

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/teams/{team_slug}/invitations` | 保留中の team 招待一覧 |
| GET | `/orgs/{org}/teams/{team_slug}/members` | team メンバー一覧（子 team のメンバーを含む。`role`: `member` / `maintainer` / `all`） |
| GET | `/orgs/{org}/teams/{team_slug}/memberships/{username}` | ユーザーの team メンバーシップ取得 |
| PUT | `/orgs/{org}/teams/{team_slug}/memberships/{username}` | メンバーシップの追加・更新（body: `role`） |
| DELETE | `/orgs/{org}/teams/{team_slug}/memberships/{username}` | メンバーシップ削除 |
| GET | `/teams/{team_id}/invitations` | Legacy: 保留中の招待一覧 |
| GET | `/teams/{team_id}/members` | Legacy: メンバー一覧 |
| GET / PUT / DELETE | `/teams/{team_id}/members/{username}` | Legacy: メンバーの確認・追加・削除 |
| GET / PUT / DELETE | `/teams/{team_id}/memberships/{username}` | Legacy: メンバーシップの取得・追加更新・削除 |

## 例

```curl
curl -L \
  -X PUT \
  https://api.github.com/orgs/ORG/teams/TEAM_SLUG/memberships/USERNAME \
  -d '{
  "role": "maintainer"
}'
```

## パラメータ

| Name | Type | Description |
|---|---|---|
| `role`（PUT body） | `member` / `maintainer` | 既定 `member` |
| `role`（List members query） | `member` / `maintainer` / `all` | 既定 `all` |
| `per_page` / `page` | integer | 最大 100・既定 30 / 既定 1 |

## レスポンス

| Endpoint | Fields |
|---|---|
| Get / Add or update membership | `url`、`role`（`member` / `maintainer`、既定 `member`）、`state`（`active` / `pending`） |
| List team members | `Team Member`: Simple User 項目に加え `role`（`member` / `maintainer`）と `inherited`（boolean） |
| List pending invitations | `Organization Invitation`: `id`、`login`（nullable）、`email`、`role`、`created_at`、`failed_at`、`failed_reason`、`inviter`、`team_count`、`node_id`、`invitation_teams_url`、`invitation_source` |

## 注意事項

- 認証済みの当該 Organization メンバーのみ利用可。OAuth アクセストークンは `read:org` スコープが必要
- IdP と team synchronization を設定している team では、API でメンバーシップを変更するとエラーになる。IdP 側で管理する。team synchronization は GitHub Enterprise Cloud の Organization で利用可能
- 招待一覧: `role` は `direct_member` / `admin` / `billing_manager` / `hiring_manager` / `reinstate`。招待先が GitHub メンバーでなければ `login` は null。enterprise team を Organization レベルで変更しようとすると 422
- メンバー一覧: `role` と `inherited`（子 team からの継承なら true）が追加リクエスト無しで読める。team が認証ユーザーから見えることが必要
- メンバーシップ取得: Organization owner の role は `maintainer`。メンバーシップが無ければ 404
- 追加・更新: Organization owner または team maintainer が実行可。owner は Organization 外のユーザーも追加でき、その場合はメール招待が送られ、承諾まで `pending`、承諾後 `active`。既存メンバーに実行すると role を更新。IdP 連携時は 403、Organization を team に追加しようとすると 422
- 削除: team の admin 権限または Organization owner が必要。ユーザー自体は削除されない。204、team synchronization 設定時は 403
- Deprecated: `/teams/{team_id}` 系 Legacy は closing down。`Get team member` / `Add team member` / `Remove team member` は、membership エンドポイント（保留中の招待も扱える）への移行が推奨されている。Legacy の Add team member は Content-Length を 0 にする必要があり、対象者は Organization メンバーかつ同 Organization の別 team にも所属している必要がある（満たさないと 422）
- 標準ヘッダー `Authorization: Bearer <YOUR-TOKEN>` / `Accept: application/vnd.github+json` / `X-GitHub-Api-Version: 2026-03-10`（原文の注記、curl 例では省略）

## Related

- [teams.md](./teams.md)
- [orgs.md](../orgs/orgs.md)
