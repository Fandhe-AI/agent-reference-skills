# Oxc (oxlint / oxfmt)

Rust-based, extremely fast JavaScript / TypeScript tool suite.

## Usage

oxlint:

```json
{
  "scripts": { "lint": "oxlint .", "lint:fix": "oxlint . --fix" }
}
```

```json
{
  "tasks": {
    "//#lint": {},
    "//#lint:fix": { "cache": false }
  }
}
```

oxfmt (alpha):

```json
{
  "scripts": { "format": "oxfmt --check .", "format:fix": "oxfmt ." }
}
```

## Notes

- To enable type-aware lint, Compiled Packages must be built beforehand.
- oxfmt is alpha software; use caution before adopting it in production.
- Integrated workflow: run checks in parallel, run fixes sequentially (to avoid file-write conflicts).
