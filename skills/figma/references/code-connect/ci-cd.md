# CI/CD Integration

Automate Code Connect publishing in CI/CD pipelines so that component connections stay up to date when code changes are merged.

## Signature / Usage

Example GitHub Actions workflow:

```yaml
name: Publish Code Connect

on:
  push:
    branches: [main]
    paths:
      - 'src/components/**/*.figma.tsx'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx figma connect publish --exit-on-unreadable-files
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
```

## Notes

- Store the Figma personal access token in CI secrets as `FIGMA_ACCESS_TOKEN` (must have Code Connect `Write` and File content `Read` scopes)
- Use `--exit-on-unreadable-files` to fail the pipeline on configuration errors
- Restrict the workflow trigger to paths matching your Code Connect files to avoid running on every PR
- Authentication: the CLI reads the token from `--token` or `FIGMA_ACCESS_TOKEN`; store it as a CI secret, never commit it
- For CI, a Plan Access Token (PLANT) is recommended over a personal access token (PAT) on Org+ plans: PLANTs are owned by the plan and managed by admins (so they keep working when the creator leaves), can have an expiration of up to one year and be refreshed (a PAT's maximum is 90 days), and Figma CLI PLANTs use a fixed set of Figma CLI scopes. An admin creates one from the Figma CLI tab in the developer hub; use it exactly like a PAT. On Professional plans, use a personal access token (replace it in CI settings if its owner leaves or it expires)
- Establish local component connections first before setting up CI/CD automation

## Related

- [CLI Reference](./cli-reference.md)
- [CLI Quickstart](./quickstart.md)
- [Config File](./config-file.md)
