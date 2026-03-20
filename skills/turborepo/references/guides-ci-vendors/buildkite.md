# Buildkite

## .buildkite/pipeline.yml 設定例

```yaml
steps:
  - label: ":test_tube: Test"
    command: |
      npm install
      npm test
  - label: ":hammer: Build"
    command: |
      npm install
      npm run build
```

## Remote Cache 設定

secrets プラグインで環境変数を注入:

```yaml
steps:
  - label: ":test_tube: Test"
    command: |
      npm install
      npm test
    plugins:
      - secrets:
          variables:
            TURBO_TOKEN: TURBO_TOKEN
            TURBO_TEAM: TURBO_TEAM
```
