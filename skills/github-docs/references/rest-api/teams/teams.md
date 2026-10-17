# Teams API

Organization の team を作成・管理する REST API。出典: https://docs.github.com/en/rest/teams/teams

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/teams` | 認証ユーザーから見える team 一覧（`team_type`: `all` / `enterprise` / `organization`） |
| POST | `/orgs/{org}/teams` | team 作成 |
| GET | `/orgs/{org}/teams/{team_slug}` | slug で team 取得 |
| PATCH | `/orgs/{org}/teams/{team_slug}` | team 更新 |
| DELETE | `/orgs/{org}/teams/{team_slug}` | team 削除 |
| GET | `/orgs/{org}/teams/{team_slug}/repos` | team のリポジトリ一覧 |
| GET | `/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | team のリポジトリ権限確認 |
| PUT | `/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | リポジトリの追加・権限更新 |
| DELETE | `/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | team からリポジトリを外す |
| GET | `/orgs/{org}/teams/{team_slug}/teams` | 子 team 一覧 |
| GET | `/user/teams` | 認証ユーザーが所属する全 Organization の team 一覧 |
| GET / PATCH / DELETE | `/teams/{team_id}` | Legacy: team 取得・更新・削除 |
| GET | `/teams/{team_id}/repos` | Legacy: team のリポジトリ一覧 |
| GET / PUT / DELETE | `/teams/{team_id}/repos/{owner}/{repo}` | Legacy: リポジトリ権限の確認・追加・削除 |
| GET | `/teams/{team_id}/teams` | Legacy: 子 team 一覧 |

## 例

```curl
curl -L \
  -X POST \
  https://api.github.com/orgs/ORG/teams \
  -d '{
  "name": "Justice League",
  "description": "A great team",
  "permission": "push",
  "notification_setting": "notifications_enabled",
  "privacy": "closed"
}'
```

## パラメータ

### Create a team（body）

| Name | Type | Description |
|---|---|---|
| `name` | string (required) | team 名 |
| `description` | string | 説明 |
| `maintainers` | array of strings | maintainer にする Organization メンバーの username |
| `repo_names` | array of strings | 追加するリポジトリのフルネーム（`organization-name/repository-name`） |
| `privacy` | `secret` / `closed` | 非ネスト team の既定は `secret`。親 / 子 team は `closed` のみ（子 team の既定 `closed`） |
| `notification_setting` | `notifications_enabled` / `notifications_disabled` | 既定 `notifications_enabled` |
| `parent_team_id` | integer | 親 team の ID |
| `parent_team_slug` | string | 親 team の slug。`parent_team_id` 指定時は無視 |

### Update a team（body）

| Name | Type | Description |
|---|---|---|
| `name` | string | team 名 |
| `description` | string | 説明 |
| `privacy` | `secret` / `closed` | 未指定なら変更なし。ネスト時、親 team は `secret` 不可 |
| `notification_setting` | `notifications_enabled` / `notifications_disabled` | 未指定なら変更なし |
| `permission` | `pull` / `push` / `admin` | 原文は "Closing down notice"。権限未指定でリポジトリ追加した際の権限（既定 `pull`） |
| `parent_team_id` | integer or null | 親 team の ID |
| `parent_team_slug` | string or null | 親 team の slug。`parent_team_id` 指定時は無視 |

### Add or update team repository permissions（body）

| Name | Type | Description |
|---|---|---|
| `permission` | string | `pull` / `triage` / `push` / `maintain` / `admin`、または Organization 定義のカスタムリポジトリロール名。未指定なら team の `permission` 属性に従う |

共通 query: `per_page`（最大 100、既定 30）、`page`（既定 1）。

## 注意事項

- 認証済みの当該 Organization メンバーのみ利用可。OAuth アクセストークンは `read:org` スコープが必要。slug は team `name` から生成される
- `pull` / `push` は Organization リポジトリの Read / Write ロールに対応
- team は `org_id` と `team_id` でも指定可（例: `GET /organizations/{org_id}/team/{team_id}`）
- Create: Organization のメンバーまたは owner が作成可（owner は作成を owner のみに制限可能）。作成者は自動的に team maintainer になる。ステータスは 201 / 403 / 422
- Update: Organization owner または team maintainer。ステータス 200 / 201 / 403 / 404 / 422
- Delete: Organization owner または team maintainer。owner が親 team を削除すると子 team も削除される。204、Organization レベルで enterprise team を変更しようとすると 422
- Repos 一覧: OAuth app トークン / classic PAT は `read:org` または `repo` スコープが必要
- 権限確認: 親 team 経由で継承したリポジトリも対象。権限が無ければ 404。media type `application/vnd.github.v3.repository+json` を Accept に指定すると 200 でリポジトリ情報と team 権限を返す（通常は 204）。private リポジトリは read 権限以上と `repo` または `admin:org` スコープが必要
- リポジトリ追加・更新: リポジトリへの admin 権限と team が見えることが必要。リポジトリは Organization 所有またはその直接 fork。対象外は 422。パラメータ無しなら Content-Length を 0 にする。204
- リポジトリ削除: Organization owner / team maintainer は任意のリポジトリを外せる。メンバーはリポジトリの admin 権限が必要。リポジトリ自体は削除されない
- `/user/teams`: OAuth app トークン / classic PAT は `user`、`repo`、`read:org` のいずれか。fine-grained PAT の場合、リソースオーナーは単一 Organization でなければならず、その Organization の team のみ返る
- Deprecated: `/teams/{team_id}` 系 Legacy エンドポイントはすべて "Endpoint closing down notice"（Teams API から削除予定）。対応する `/orgs/{org}/teams/{team_slug}` 系へ移行すること
- 標準ヘッダー `Authorization: Bearer <YOUR-TOKEN>` / `Accept: application/vnd.github+json` / `X-GitHub-Api-Version: 2026-03-10`（原文の注記、curl 例では省略）

## Related

- [members.md](./members.md)
- [orgs.md](../orgs/orgs.md)
