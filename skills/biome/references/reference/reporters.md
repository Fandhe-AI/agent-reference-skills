# Reporters

`--reporter` 引数で診断とサマリーの出力形式を変更。既定は `default`。

| レポーター | 説明 | コマンド例 |
|-----------|------|----------|
| default | 完全な診断とサマリー（ターミナル向け、既定） | `biome check` |
| concise | 診断 1 件 1 行。formatter 診断はまとめる（2.5.0 で追加） | `biome check --reporter=concise` |
| summary | ターミナル向け構造化出力（カテゴリ・ルール別） | `biome check --reporter=summary` |
| json | JSON 形式（実験的） | `biome ci --reporter=json` |
| json-pretty | 整形 JSON | `biome ci --reporter=json-pretty` |
| github | GitHub Actions 向け（PR 内メッセージ表示） | `biome ci --reporter=github` |
| junit | JUnit XML 形式（CI/CD 統合） | `biome check --reporter=junit` |
| gitlab | GitLab コードクオリティ形式 | `biome check --reporter=gitlab` |
| checkstyle | Checkstyle XML 形式 | `biome check --reporter=checkstyle` |
| rdjson | Reviewdog 形式 | `biome check --reporter=rdjson` |
| sarif | SARIF セキュリティ分析形式 | `biome check --reporter=sarif` |

## Notes

- `json` / `json-pretty` は実験的で、patch リリースでも出力が変わりうる
- `--reporter` を繰り返すと複数出力でき、`--reporter-file=<PATH>` で出力先ファイルを指定する
- 公式の `/reference/reporters` ページは `/reference/cli/#reporter-flags` へリダイレクトされる（`cli.md` 参照）
