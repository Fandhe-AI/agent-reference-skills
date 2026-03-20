# GitLab CI

## .gitlab-ci.yml 設定例（pnpm）

```yaml
image: node:latest
stages:
  - build
build:
  stage: build
  before_script:
    - curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@6.32.2
    - pnpm config set store-dir .pnpm-store
  script:
    - pnpm install
    - pnpm build
    - pnpm test
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store
```

## Remote Cache 設定

1. Vercel でスコープ付きアクセストークンを作成
2. GitLab「リポジトリ設定 → CI/CD → Variables」で `TURBO_TOKEN` と `TURBO_TEAM` を登録
