# GitLab CI

## Usage

Example `.gitlab-ci.yml` (pnpm):

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

## Notes

- Configure Remote Cache:
  1. Create a scoped access token in Vercel.
  2. Register `TURBO_TOKEN` and `TURBO_TEAM` under GitLab "Settings → CI/CD → Variables".
