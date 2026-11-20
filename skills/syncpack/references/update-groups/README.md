# Update Groups

Control how and whether dependencies receive updates from the npm registry via the `update` command. Groups are evaluated sequentially; the first matching group applies. The stricter of the CLI `--target` and group `target` wins.

| Name | Description | Path |
|------|-------------|------|
| ignored | Exclude matched dependencies from all registry update checks (`isIgnored: true`) | [ignored.md](./ignored.md) |
| targeted | Restrict the highest update version offered for matched dependencies (`target: "patch"\|"minor"\|"latest"`) | [targeted.md](./targeted.md) |

## Common Filter Properties

All update groups share these optional filter properties:

| Property | Description |
|----------|-------------|
| `dependencies` | Dependency names to match (exact or glob). Defaults to all. |
| `dependencyTypes` | `package.json` locations to match. Supports negation. Defaults to all. |
| `specifierTypes` | Version specifier formats to match. Supports negation. Defaults to all. |
| `packages` | Monorepo package names to match (exact or glob). Supports negation. |
| `label` | Display name for syncpack output. |
