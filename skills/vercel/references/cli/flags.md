# vercel flags

Manage Vercel Flags (feature flags) for a project: create, list, inspect, version history, evaluation metrics, update variants, set/split/rollout, targeting, rules, targets, segments, entities, labels, project connections, datafile, SDK keys, overrides, and archive/delete.

## Signature / Usage

```bash
vercel flags list
vercel flags create welcome-message --kind string --description "Homepage welcome copy" \
  --variant control="Welcome back" --variant treatment="Start for free"
vercel flags inspect [flag]
vercel flags open welcome-message
vercel flags datafile --environment production --json
vercel flags versions welcome-message --limit 10
vercel flags versions diff welcome-message --revision 4
vercel flags evaluations new-checkout --since 1h --granularity 15m
vercel flags update welcome-message --variant control --value welcome-back \
  --label "Welcome back" --message "Refresh control copy"
vercel flags set welcome-message --environment preview --variant control \
  --message "Serve the control copy in preview"
vercel flags targeting enable welcome-message --environment production \
  --default-variant control
vercel flags split ai-summary-model --environment production --by user.id \
  --default-variant stable --weight stable=95 --weight candidate=5 \
  --message "Route summary traffic to the candidate model"
vercel flags rollout redesigned-checkout --environment production --by user.id \
  --stage 5,6h --stage 10,6h --stage 25,12h --stage 50,1d \
  --message "Start redesigned checkout rollout"
vercel flags rules add my-feature --environment production \
  --condition user.plan:eq:pro --variant on \
  --message "Enable Pro users"
vercel flags targets add my-feature -e production user.id=user_123 user.id=user_456
vercel flags enable my-feature --environment production --message "Resume rollout"
vercel flags disable my-feature -e production --variant false \
  --message "Pause rollout in production"
vercel flags archive my-feature --yes
vercel flags unarchive my-feature --yes
vercel flags delete my-feature --yes
vercel flags sdk-keys list
vercel flags sdk-keys create --type server --environment production
vercel flags sdk-keys revoke [hash-key]
vercel flags override my-flag=42 --expiration 30d
vercel flags prepare
```

### Entities, labels, segments, connections

```bash
vercel flags entities create user --label User \
  --attribute id:string --attribute plan:string --attribute signupAt:timestamp
vercel flags entities update user --label "End user" \
  --add-attribute email:string --remove-attribute legacyId
vercel flags entities delete device --yes
vercel flags labels ls user.plan --limit 50
vercel flags labels set user.plan pro "Pro Plan"
vercel flags labels remove user.plan pro
vercel flags labels apply user.plan \
  --set "pro=Pro Plan" --set "enterprise=Enterprise Plan" --remove legacy
vercel flags segments create beta-users --label "Beta users" \
  --add include:user.id=user_123 --add include:user.id=user_456
vercel flags segments update enterprise-users \
  --add rule:user.email:ends-with:@company.com \
  --remove rule:user.plan:eq:pro
vercel flags segments delete beta-users --yes
vercel flags connections add storefront --project checkout
vercel flags connections list --project storefront --role consumer
vercel flags connections remove storefront --project checkout
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--state` | | Filter `list` by state: `active` (default) or `archived` |
| `--limit` | | Page size: `versions` / `versions list` default 20 (1-100); `list` returns all unless set (1-100); `labels ls` default 20 (any positive integer) |
| `--next` | | Cursor for the next page of `list`, `versions`, `labels ls` (JSON: `pagination.next`) |
| `--json` | | Machine-readable output for `list`, `datafile`, `versions`, `versions diff`, `evaluations`, `rules list`, `segments list/inspect/create/update`, `entities list/create/update`, `labels` subcommands, `sdk-keys list`, `connections list` |
| `--project` | | Project name or ID (default: linked project); for `connections` selects the source project |
| `--revision` | | Required for `versions diff`; compared with the preceding revision (revision `0` cannot be diffed) |
| `--kind` | | Flag type for `create`: `boolean` (default), `string`, `number`, `json` |
| `--description` | | Description for `create` / `update`; also segment description for `segments create` / `update` |
| `--hint` | | Segment help text for `segments create` / `update` (defaults to the description or label on create) |
| `--environment` | `-e` | `production`, `preview`, `development`. Target for `datafile` (default `development`), `set`, `targeting enable`, `split`, `rollout`, `enable`, `disable`, `rules`, `targets`, `sdk-keys create`; filters `versions` by changed environment |
| `--variant` | | Define variants on `create` (`VALUE` or `VALUE=Label`; JSON: `'<JSON>'` or `'<JSON>'=Label`); select a variant by ID or value on `update`, `set`, `disable`, `rules add/update`, `targets add` (JSON: ID or current JSON value, not the label) |
| `--add-variant` / `--remove-variant` | | `update` for String / Number / JSON flags: add `VALUE[=LABEL]` or remove by ID/value (repeatable; cannot combine with `--variant` / `--value` / `--label`; remove needs `--yes` non-interactively) |
| `--value` | | New variant value for `update` (JSON flags: valid JSON; boolean values cannot change) |
| `--label` | | Variant label (`update`), segment / entity label, SDK key label (`sdk-keys create`) |
| `--message` | | Revision message for `update`, `set`, `targeting enable`, `split`, `rollout`, `enable`, `disable`, `archive`, `rules add/update/move/remove`, `targets add/remove` |
| `--by` | | Bucketing attribute `entity.attribute` (e.g. `user.id`) for `split`, `rollout`, `rules add/update`; timestamp attributes not allowed |
| `--weight` | | `VARIANT=WEIGHT` for `split`, `rules add/update` (repeatable, one per variant; normalized to percentages; `0` excludes) |
| `--default-variant` | | Fallback when the bucketing attribute is missing (`split`, `rollout`, rules); with `targeting enable` sets the fallthrough variant |
| `--from-variant` / `--to-variant` | | Rollout start / target variant (boolean flags default `false` to `true`; others must pass them) |
| `--stage` | | Rollout stage `PERCENTAGE,DURATION` (e.g. `5,6h`), repeatable, for `rollout`, `rules add/update` |
| `--final-percentage` | | Percentage of the rollout variant served after the last stage (0-100, up to 3 decimals; default 100) |
| `--start` | | Rollout start: `now`, future relative duration (`1h`), or ISO 8601 datetime |
| `--condition` | | `ENTITY.ATTRIBUTE:OPERATOR:VALUE` or `segment:OPERATOR:SEGMENT` for `rules add`; replaces all conditions on `rules update`; repeat or separate with `;` |
| `--position` | | 1-based rule position for `rules add` (default: end) / `rules move` |
| `--since` / `--until` | `-s` / `-u` | `evaluations` window: relative duration (`1h`, `30m`, `2d`, `1w`) or ISO 8601; defaults to the last hour / now |
| `--group-by` | | `evaluations` dimensions (repeatable): `variant` (needs a flag), `flag`, `sdk-key`, `client`, `environment`, `reason`, `datafile-revision` |
| `--granularity` | | `evaluations` bucket: `1m`, `5m`, `15m`, `1h`, `4h`, `1d` (automatic by range, with a minimum bucket) |
| `--data` | | Full JSON: segment data (`rules` / `include` / `exclude`) for `segments create` / `update`; array of label operations for `labels apply` (not with `--set` / `--remove`) |
| `--add` / `--remove` | | Segment criteria (`include:E.A=V`, `exclude:E.A=V`, `rule:E.A:OP:V`, `--remove rule:RULE_ID`); for `labels apply --remove` takes a raw value |
| `--set` | | `VALUE=LABEL` for `labels apply` (repeatable) |
| `--attribute` | | `KEY:TYPE` for `entities create`; types `string`, `number`, `boolean`, `stringArray`, `timestamp` |
| `--add-attribute` / `--remove-attribute` / `--set-attribute-type` | | `entities update` (`KEY:TYPE`, `KEY`, `KEY:TYPE`; repeatable) |
| `--role` | | `connections list`: `source` (default) or `consumer` |
| `--sdk-key` | | `datafile`: read with an existing SDK key via stdin; cannot combine with `--project` / `--environment` |
| `--type` | | SDK key type for `sdk-keys create`: `server` or `client` |
| `--yes` | `-y` | Skip confirmation for `archive`, `unarchive`, `delete`, variant removal, `segments delete`, `entities delete`, `sdk-keys revoke`, `connections remove` |
| `--expiration` | | `override` token expiry (jose duration, e.g. `30d`); default `1y` |
| `--decrypt` | | `override --decrypt <token>` prints the payload as JSON |

## Notes

- Boolean flags always have `false`/`true` variants (labeled Off/On); new boolean flags serve `true` in development and `false` in preview and production. Flags created with `create` start with targeting off in every environment
- JSON variants accept any valid JSON value; string/number/JSON `create` needs `--variant` in non-interactive environments
- With targeting on, an environment checks direct targets, then conditional rules (top to bottom), then the fallthrough (one variant, split, or rollout). `split` and `rollout` also turn targeting on; `targets add` alone does not. To turn targeting off use `set` (or `enable` / `disable` for boolean flags)
- `enable` / `disable` work only on boolean flags
- A flag must be archived before it can be deleted; `unarchive` on an already active flag warns and exits successfully
- Rule operators: `eq`, `!eq`, `oneOf`, `!oneOf`, `containsAllOf`, `containsAnyOf`, `containsNoneOf`, `startsWith`, `endsWith`, `contains`, `!contains`, `ex`, `!ex`, `gt`, `gte`, `lt`, `lte` (with documented aliases such as `=`, `in`, `exists`, `>`). `timestamp` attributes accept only `after`, `at-or-after`, `before`, `at-or-before` with an ISO 8601 date and time (hours and minutes required) or epoch milliseconds
- Rules, targets and segments: rule IDs come from `rules list`; `rules update` / `move` / `remove` on an environment reusing another environment's configuration copy the effective rules and disable reuse; `targets add` entries are `entity.attribute=value` (append `|label` quoted to label the value); segments cannot be deleted while referenced; entities cannot be deleted or have attributes removed or retyped while referenced (max 32 entities, 32 attributes each)
- `evaluations` returns up to 100 most evaluated groups (`truncated` in JSON); error codes include `MISSING_FLAG`, `INVALID_GRANULARITY`, `INVALID_GROUP_BY`, `INVALID_TIME`, `NOT_LINKED`, `PROJECT_NOT_FOUND`, `PROJECT_RESOLUTION_FAILED`; with `--json` errors are `{"error":{"code","message"}}`
- `datafile` defaults to the `development` environment; `development` uses a project OIDC token (falls back to the CLI token), `preview` / `production` use the CLI token
- `vercel flags connections` requires Vercel CLI 63.0.0 or later; the source project owns the flags and the consumer project reads them with its OIDC token; adding or removing needs team Member / Owner or Project Admin on the source project
- The SDK key is shown only once at creation (`list` shows a masked preview); lost keys must be revoked and recreated
- `FLAGS_SECRET` (256-bit base64url, from the process env, `.env.local` or `.env`) is required for every `override` call including `--decrypt`; the token goes in the `vercel-flag-overrides` cookie
- `vercel flags prepare` writes a synthetic `@vercel/flags-definitions` package into `node_modules`; the build pipeline runs it automatically when an env var holds a `vf_server_*` / `vf_client_*` key, `@flags-sdk/vercel` or `@vercel/flags-core` is installed, or `VERCEL_FLAGS_EMBED_DEFINITIONS=force-on` (`force-off` skips)
- `--final-percentage` below 100 requires `@vercel/flags-core` 1.9.0 or later; older SDKs finish at 100%
- Command names changed vs the previous fetch: the docs now list `delete`, `sdk-keys list` / `create` / `revoke`; the earlier `rm`, `sdk-keys ls` / `add` / `rm` forms and the shorthands `-k`, `-d`, `-v`, `-l`, `-w` and `-s` on `--state` / `--stage` are not confirmed in the current official docs
- Source: https://vercel.com/docs/cli/flags (fetched 2026-11-14)

## Related

- [env.md](./env.md)
- [deploy.md](./deploy.md)
