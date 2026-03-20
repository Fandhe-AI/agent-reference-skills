# Assignees API

Issue のアサイニー（担当者）の確認・追加・削除を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/assignees` | アサイン可能なユーザー一覧取得 |
| GET | `/repos/{owner}/{repo}/assignees/{assignee}` | 特定ユーザーがアサイン可能か確認（204: 可能、404: 不可） |
| POST | `/repos/{owner}/{repo}/issues/{issue_number}/assignees` | アサイニーの追加 |
| DELETE | `/repos/{owner}/{repo}/issues/{issue_number}/assignees` | アサイニーの削除 |

## パラメータ

### 追加・削除パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `assignees` | array of string | アサインするユーザー名の配列 |

## 注意事項

- 1リクエストあたり最大10名まで指定可能
- アサイン操作にはリポジトリへの push アクセス権限が必要
