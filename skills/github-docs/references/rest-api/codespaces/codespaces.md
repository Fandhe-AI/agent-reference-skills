# Codespaces API

Codespace の作成・取得・更新・削除・起動停止・エクスポート・公開を行うエンドポイント。

## エンドポイント

### リポジトリ単位

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/codespaces` | リポジトリの Codespace 一覧取得 |
| POST | `/repos/{owner}/{repo}/codespaces` | Codespace の作成 |
| GET | `/repos/{owner}/{repo}/codespaces/devcontainers` | 利用可能な devcontainer.json 一覧取得 |
| GET | `/repos/{owner}/{repo}/codespaces/new` | Codespace 作成時のデフォルト属性取得 |
| GET | `/repos/{owner}/{repo}/codespaces/permissions_check` | devcontainer 権限の承認状態確認 |
| POST | `/repos/{owner}/{repo}/pulls/{pull_number}/codespaces` | Pull Request 用 Codespace の作成 |

### 認証ユーザー単位

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/user/codespaces` | 自分の Codespace 一覧取得 |
| POST | `/user/codespaces` | Codespace の作成 |
| GET | `/user/codespaces/{codespace_name}` | 単一 Codespace の取得 |
| PATCH | `/user/codespaces/{codespace_name}` | マシンタイプ・表示名・最近使用フォルダの更新 |
| DELETE | `/user/codespaces/{codespace_name}` | Codespace の削除 |
| POST | `/user/codespaces/{codespace_name}/exports` | エクスポートの開始 |
| GET | `/user/codespaces/{codespace_name}/exports/{export_id}` | エクスポート状況の取得 |
| POST | `/user/codespaces/{codespace_name}/publish` | 未公開 Codespace を新規リポジトリとして公開 |
| POST | `/user/codespaces/{codespace_name}/start` | 停止中の Codespace を起動 |
| POST | `/user/codespaces/{codespace_name}/stop` | 起動中の Codespace を停止 |

## Notes

- Organization の Codespace ポリシー・課金管理は別カテゴリ（Organization admin 系エンドポイント）で扱う
- classic PAT は `codespace` スコープが必要
