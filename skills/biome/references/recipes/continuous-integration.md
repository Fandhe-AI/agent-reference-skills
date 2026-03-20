# CI/CD

## biome ci コマンド

CI 環境では `biome ci` を使用。`--write`/`--fix` オプションなし（読み取り専用）。

特徴:
- GitHub 等の環境に最適化されたアノテーション形式で診断出力
- スレッド数制御可能
- VCS 統合時に `--changed` フラグ使用可能

## GitHub Actions

### 公式 Action

```yaml
name: Code quality
on:
  push:
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: biomejs/setup-biome@v2
        with:
          version: latest
      - run: biome ci .
```

外部依存がある場合は事前に Node.js セットアップと依存インストールが必要。

## GitLab CI

```yaml
stages:
  - quality

lint:
  image:
    name: ghcr.io/biomejs/biome:latest
    entrypoint: [""]
  stage: quality
  script:
    - biome ci --reporter=gitlab --colors=off > code-quality.json
  artifacts:
    reports:
      codequality:
        - code-quality.json
```
