# Reporters

`--reporter` 引数で診断とサマリーの出力形式を変更。

| レポーター | 説明 | コマンド例 |
|-----------|------|----------|
| summary | ターミナル向け構造化出力 | `biome check --reporter=summary` |
| json | JSON 形式（実験的） | `biome ci --reporter=json` |
| json-pretty | 整形 JSON | `biome ci --reporter=json-pretty` |
| github | GitHub Actions 向け（PR 内メッセージ表示） | `biome ci --reporter=github` |
| junit | JUnit XML 形式（CI/CD 統合） | `biome check --reporter=junit` |
| gitlab | GitLab コードクオリティ形式 | `biome check --reporter=gitlab` |
| checkstyle | Checkstyle XML 形式 | `biome check --reporter=checkstyle` |
| rdjson | Reviewdog 形式 | `biome check --reporter=rdjson` |
| sarif | SARIF セキュリティ分析形式 | `biome check --reporter=sarif` |
