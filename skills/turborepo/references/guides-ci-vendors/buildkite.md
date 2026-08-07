# Buildkite

## Usage

Example `.buildkite/pipeline.yml`:

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

## Notes

- Configure Remote Cache by injecting environment variables through the `secrets` plugin:

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
