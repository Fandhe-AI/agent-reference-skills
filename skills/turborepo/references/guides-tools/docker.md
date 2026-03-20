# Docker

## 問題

モノレポでは `package-lock.json` がリポジトリ全体で共有されるため、無関係な変更が全アプリの再ビルドを引き起こす。

## 解決策: turbo prune

```bash
turbo prune api --docker
```

出力構造:
- `./out/json` — 依存インストール用の package.json のみ
- `./out/full` — 完全なソースファイルと設定

## Dockerfile 実装例

```dockerfile
FROM base AS prepare
RUN yarn global add turbo@^2
RUN turbo prune web --docker

FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN yarn install
COPY --from=prepare /app/out/full/ .
RUN yarn turbo build
```

## Remote Cache との連携

```bash
docker build -f apps/web/Dockerfile . \
  --build-arg TURBO_TEAM="your-team-name" \
  --build-arg TURBO_TOKEN="your-token" \
  --no-cache
```
