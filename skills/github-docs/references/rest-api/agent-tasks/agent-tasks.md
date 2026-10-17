# Agent Tasks API (Copilot cloud agent)

Copilot cloud agent のタスクを開始・取得するエンドポイント（public preview）。出典: https://docs.github.com/en/rest/agent-tasks/agent-tasks

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/agents/repos/{owner}/{repo}/tasks` | リポジトリのタスク一覧 |
| POST | `/agents/repos/{owner}/{repo}/tasks` | タスクを開始 |
| GET | `/agents/repos/{owner}/{repo}/tasks/{task_id}` | リポジトリ配下パスで ID 指定のタスク取得 |
| GET | `/agents/tasks` | 認証ユーザーのタスク一覧 |
| GET | `/agents/tasks/{task_id}` | ID 指定でタスクと sessions を取得 |

## 例

```curl
curl -L \
  -X POST \
  https://api.github.com/agents/repos/OWNER/REPO/tasks \
  -d '{
  "prompt": "Fix the login button on the homepage",
  "base_ref": "main"
}'
```

カスタムエージェント指定:

```curl
curl -L \
  -X POST \
  https://api.github.com/agents/repos/OWNER/REPO/tasks \
  -d '{
  "prompt": "Fix the login button on the homepage",
  "base_ref": "main",
  "custom_agent": "my-custom-agent"
}'
```

## パラメータ

Start a task（POST）の body:

| Name | Type | Description |
|---|---|---|
| `prompt` (required) | string | The user's prompt for the agent |
| `model` | string | The model to use for this task. Allowed models may change over time and depend on the user's Copilot plan and organization policies. Currently supported: claude-sonnet-4.6, claude-opus-4.6, gpt-5.2-codex, gpt-5.3-codex, gpt-5.4, claude-sonnet-4.5, claude-opus-4.5 |
| `custom_agent` | string | Custom agent の filename から拡張子を除いた識別子（例: `.github/agents/performance-optimizer.agent.md` → `performance-optimizer`） |
| `create_pull_request` | boolean | Whether to create a PR. Default `false` |
| `base_ref` | string | Base ref for new branch/PR |
| `head_ref` | string | Head ref for existing branch/PR. base_ref と併用時、base_ref を対象とする head_ref の open PR コンテキストを参照し、新規ブランチを作らず head_ref にコミットする |

List 系（GET）のクエリ:

| Name | Type | Description |
|---|---|---|
| `owner` / `repo` (required) | string | リポジトリ版のパスパラメータ（大文字小文字不問） |
| `per_page` | integer | 最大 100、既定 30 |
| `page` | integer | 既定 1 |
| `sort` | string | `updated_at`（既定）/ `created_at` |
| `direction` | string | `desc`（既定）/ `asc` |
| `state` | string | カンマ区切り: queued, in_progress, completed, failed, idle, waiting_for_user, timed_out, cancelled |
| `is_archived` | boolean | true でアーカイブ済みのみ。既定 `false` |
| `since` | string | この時刻以降に更新されたタスクのみ（ISO 8601） |
| `creator_id` | array | 作成者 user ID で絞り込み（リポジトリ版 List のみ） |

Task オブジェクト:

| Field | Type | Description |
|---|---|---|
| `id` | string | required |
| `url` / `html_url` / `name` | string | — |
| `creator` | object | `id`（integer） |
| `creator_type` | string | `user` / `organization` |
| `user_collaborators` | array of objects | 各要素 `id`（integer） |
| `owner` / `repository` | object | `id`（integer） |
| `state` | string | required。上記 state 値 |
| `session_count` | integer | — |
| `artifacts` | array of objects | `provider`: `github`、`type`: `pull` / `branch`、`data` は `id` / `global_id` または `head_ref` / `base_ref` |
| `archived_at` | string or null | date-time |
| `updated_at` | string | date-time |
| `created_at` | string | required。date-time |
| `custom_agent` | object | `id`（string） |

List のレスポンスは `tasks` に加え `total_active_count` / `total_archived_count`。

Get 系のレスポンスは Task に加え `sessions[]` を含む:

| Field | Type | Description |
|---|---|---|
| `id` | string | required |
| `name` / `task_id` | string | — |
| `user` / `owner` / `repository` | object | `id`（integer） |
| `state` | string | required。セッションの状態 |
| `created_at` | string | required。date-time |
| `updated_at` / `completed_at` | string | date-time |
| `prompt` / `head_ref` / `base_ref` / `model` | string | — |
| `usage` | object | `type`: `ai_credits` / `premium_requests`、`amount`: number |
| `error` | object | `message`（string） |

## 注意事項

- public preview で変更の可能性あり（原文 Note）
- 標準ヘッダー: `Authorization: Bearer <YOUR-TOKEN>` / `Accept: application/vnd.github+json` / `X-GitHub-Api-Version: 2026-03-10`（curl 例では省略）
- 対応トークン: GitHub App user access token と fine-grained PAT。必要権限は "Agent tasks" repository permissions（read、Start は read and write）。**GitHub App installation access token は非対応**
- Start a task は Copilot Business / Copilot Enterprise 契約ユーザーのみ
- status code: List / Get は 200（400 / 401 / 403 / 404 / 422。`GET /agents/tasks` に 404 の記載なし）、Start は 201（400 / 401 / 403 / 422）
- `model` の許可値は時期・プラン・組織ポリシーで変わる。上記は取得時点の原文記載

## Related

- [coding-agent-management.md](../copilot/coding-agent-management.md)
