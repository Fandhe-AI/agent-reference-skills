# vercel flags

Manage Vercel Flags (feature flags) for a project: create, list, inspect, update, set variants, split traffic, rollout, enable/disable, archive, delete, and manage SDK keys.

## Signature / Usage

```bash
vercel flags list
vercel flags create my-feature --kind boolean
vercel flags create welcome-msg --kind string --variant control="Hello" --variant treatment="Hi"
vercel flags set my-feature --environment production --variant true
vercel flags split ai-model --environment production --by user.id --weight stable=95 --weight candidate=5
vercel flags rollout checkout --environment production --by user.id --stage 5,6h --stage 50,1d
vercel flags enable my-feature --environment production
vercel flags disable my-feature --environment production
vercel flags archive my-feature --yes
vercel flags rm my-feature --yes
vercel flags sdk-keys ls
vercel flags sdk-keys add --type server --environment production
vercel flags override my-flag=true
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--state` | `-s` | Filter `list` by state: `active` (default) or `archived` |
| `--kind` | `-k` | Flag type for `create`: `boolean` (default), `string`, `number`, `json` |
| `--description` | `-d` | Description for `create` |
| `--environment` | `-e` | Target environment: `production`, `preview`, `development` |
| `--variant` | `-v` | Variant definition (`VALUE` or `VALUE=Label`) for `create`; variant ID/value selector for `update`/`set`/`disable` (repeatable) |
| `--value` | | New variant value for `update` |
| `--label` | `-l` | Variant label for `update`; SDK key label for `sdk-keys add` |
| `--message` | | Revision message for `update`, `set`, `split`, `rollout`, `enable`, `disable` |
| `--by` | | Entity attribute for bucketing in `split`/`rollout` (format: `entity.attribute`, e.g. `user.id`) |
| `--weight` | `-w` | Variant weight for `split` as `VARIANT=WEIGHT` (repeatable) |
| `--default-variant` | | Fallback variant when bucketing attribute is missing (`split`/`rollout`) |
| `--from-variant` | | Starting variant for `rollout` |
| `--to-variant` | | Target variant for `rollout` |
| `--stage` | `-s` | Rollout stage as `PERCENTAGE,DURATION` (repeatable, e.g. `5,6h`) |
| `--start` | | Rollout start time: `now`, relative duration (`1h`), or ISO 8601 datetime |
| `--type` | | SDK key type for `sdk-keys add`: `server` or `client` |
| `--yes` | `-y` | Skip confirmation for `archive`, `rm`, `sdk-keys rm` |
| `--expiration` | | Override token expiry for `override` (e.g. `30d`); default: `1y` |
| `--decrypt` | | Decrypt an existing override token with `override --decrypt <token>` |

## Notes

- Boolean flags always have `false`/`true` variants (labeled Off/On)
- JSON flags accept any valid JSON value including objects, arrays, numbers, strings, null
- A flag must be archived before it can be deleted
- `FLAGS_SECRET` env var is required for `vercel flags override`
- `vercel flags prepare` writes synthetic `@vercel/flags-definitions` package; typically run automatically by the build pipeline

## Related

- [env.md](./env.md)
- [deploy.md](./deploy.md)
