# Multi-Language Support

## Signature / Usage

Turborepo is agnostic about what a script actually runs, so toolchains like Rust or Go can be integrated as well.

Adding to the workspace definition:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
  - "cli"
```

Wrapping with `package.json`:

```json
{
  "name": "@repo/rust-cli",
  "scripts": { "build": "cargo build --release" }
}
```

Caching configuration:

```json
{ "tasks": { "build": { "outputs": ["target/release/**"] } } }
```

Declaring dependencies:

```json
{ "dependencies": { "@repo/rust-cli": "workspace:*" } }
```

## Notes

- Non-JS toolchains (Rust, Go, etc.) must be installed separately; Turborepo does not manage them.
