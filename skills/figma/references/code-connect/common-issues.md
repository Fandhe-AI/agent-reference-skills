# Common Issues

Known Code Connect problems: connectivity through proxies and HTTP 413 errors on large uploads.

## Signature / Usage

```shell
npx figma connect publish --batch-size 50
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--batch-size` | number | Uploads Code Connect in batches of documents of this length. Start with 50 and decrease until converging on a size that works |

## Notes

- Connectivity issues due to proxies or network security software: some proxies or network security software can prevent Code Connect from communicating with Figma's servers. You may need to explicitly allow connections to `https://api.figma.com/`.
- 413 errors due to too large uploads: rerun with the `--batch-size` parameter.
- Feedback can be filed as a GitHub issue at `https://github.com/figma/code-connect/issues/new/choose`.

## Related

- [CLI Reference](./cli-reference.md)
- [CI/CD](./ci-cd.md)
