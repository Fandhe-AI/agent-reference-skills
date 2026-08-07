# Travis CI

## Usage

Example `.travis.yml` (pnpm):

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

## Notes

- When using pnpm, disable the default npm cache with `npm: false` and cache `~/.pnpm-store` separately.
- Configure Remote Cache by registering `TURBO_TOKEN` and `TURBO_TEAM` under Travis repository settings' environment variables section. Environment variables are loaded automatically, so no CI file changes are needed.
