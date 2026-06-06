# Update Groups

Control how and whether dependencies receive updates from the npm registry via the `update` command. Groups are evaluated sequentially; the first matching group applies. The stricter of the CLI `--target` and group `target` wins.

| Name | Activation Property | Description | Path |
|------|---------------------|-------------|------|
| ignored | `isIgnored: true` | Exclude matched dependencies from all registry update checks | [./ignored.md](./ignored.md) |
| targeted | `target: "patch"|"minor"|"latest"` | Restrict the highest update version offered for matched dependencies | [./targeted.md](./targeted.md) |

## Common Filter Properties

All update groups share these optional filter properties:

| Property | Description |
|----------|-------------|
| `dependencies` | Dependency names to match (exact or glob). Defaults to all. |
| `dependencyTypes` | `package.json` locations to match. Supports negation. Defaults to all. |
| `specifierTypes` | Version specifier formats to match. Supports negation. Defaults to all. |
| `packages` | Monorepo package names to match (exact or glob). Supports negation. |
| `label` | Display name for syncpack output. |
