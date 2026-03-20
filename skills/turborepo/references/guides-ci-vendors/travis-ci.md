# Travis CI

## .travis.yml 設定例（pnpm）

```yaml
language: node_js
node_js:
  - lts/*
cache:
  npm: false
  directories:
    - "~/.pnpm-store"
before_install:
  - curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@6.32.2
  - pnpm config set store-dir ~/.pnpm-store
install:
  - pnpm install
script:
  - pnpm build
  - pnpm test
```

pnpm を使う場合、`npm: false` でデフォルトの npm キャッシュを無効化し、`~/.pnpm-store` を別途キャッシュする。

## Remote Cache 設定

Travis リポジトリ設定の環境変数セクションで `TURBO_TOKEN` と `TURBO_TEAM` を登録。環境変数は自動でロードされるため CI ファイルの変更は不要。
