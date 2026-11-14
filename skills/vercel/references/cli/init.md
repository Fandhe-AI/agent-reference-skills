# vercel init

Initialize a Vercel supported framework example locally from the official examples repository.

## Signature / Usage

```bash
vercel init
vercel init [framework-name]
vercel init gatsby my-project-directory
vercel init gatsby my-project --force
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--force` | `-f` | Without it, `init` stops with an error when the target directory exists and is not empty; with it, files that are part of the example are overwritten and all other files are kept |

## Notes

- Without arguments, shows an interactive list of supported frameworks
- Optional second argument renames the local directory
- Examples sourced from [github.com/vercel/vercel/tree/main/examples](https://github.com/vercel/vercel/tree/main/examples)
- Source: https://vercel.com/docs/cli/init (fetched 2026-11-14)

## Related

- [link.md](./link.md)
- [deploy.md](./deploy.md)
