# Checks API

CI/CDの結果をGitHubのプルリクエストやコミットに関連付けるAPIセクション。

## エンドポイントカテゴリ

| カテゴリ | 説明 |
|---------|------|
| [Check Runs](check-runs.md) | 個別のチェック実行の作成・管理・アノテーション |
| [Check Suites](check-suites.md) | チェックスイート（チェック実行のグループ）の管理 |

## 概要

Checks APIはGitHub Appsが外部のCI/CDツールの結果をGitHubのUIに統合するために使用する。チェック実行（Check Run）は個別のテストやリンターの結果を、チェックスイート（Check Suite）はそれらのグループを表す。

## 重要な注意事項

- **書き込みアクセスはGitHub Appsのみ**に制限されている
- OAuthアプリやPATでは読み取りのみ可能
- チェックスイートはプッシュ時に自動作成される
