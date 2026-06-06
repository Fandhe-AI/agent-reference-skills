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
| `--force` | `-f` | Forcibly replace an existing local directory |

## Notes

- Without arguments, shows an interactive list of supported frameworks
- Optional second argument renames the local directory
- Examples sourced from [github.com/vercel/vercel/tree/main/examples](https://github.com/vercel/vercel/tree/main/examples)

## Related

- [link.md](./link.md)
- [deploy.md](./deploy.md)
