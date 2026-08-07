# Docker

## Usage

Problem: in a monorepo, `package-lock.json` is shared across the whole repository, so unrelated changes trigger full rebuilds of every app.

Solution: `turbo prune`

```bash
turbo prune api --docker
```

Output structure:
- `./out/json` — only the `package.json` files needed for dependency install
- `./out/full` — full source files and configuration

Example Dockerfile:

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

Remote Cache integration:

```bash
docker build -f apps/web/Dockerfile . \
  --build-arg TURBO_TEAM="your-team-name" \
  --build-arg TURBO_TOKEN="your-token" \
  --no-cache
```
