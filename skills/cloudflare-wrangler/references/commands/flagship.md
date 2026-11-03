---
source: https://developers.cloudflare.com/workers/wrangler/commands/flagship/
---

# Flagship

Use `wrangler flagship` to manage Flagship apps and feature flags from the command line. Available in Wrangler v4.107.0 and later.

## Signature / Usage

```sh
npx wrangler flagship apps create <NAME>
npx wrangler flagship apps list
npx wrangler flagship apps get <APP-ID>
npx wrangler flagship apps update <APP-ID>
npx wrangler flagship apps delete <APP-ID>
npx wrangler flagship flags create <APP-ID> <KEY>
npx wrangler flagship flags list <APP-ID>
npx wrangler flagship flags get <APP-ID> <KEY>
npx wrangler flagship flags pull <APP-ID>
npx wrangler flagship flags update <APP-ID> <KEY>
npx wrangler flagship flags set <APP-ID> <KEY>
npx wrangler flagship flags rules list <APP-ID> <KEY>
npx wrangler flagship flags rules update <APP-ID> <KEY>
npx wrangler flagship flags rules delete <APP-ID> <KEY>
npx wrangler flagship flags rules reorder <APP-ID> <KEY>
npx wrangler flagship flags split <APP-ID> <KEY>
npx wrangler flagship flags rollout <APP-ID> <KEY>
npx wrangler flagship flags enable <APP-ID> <KEY>
npx wrangler flagship flags disable <APP-ID> <KEY>
npx wrangler flagship flags evaluate <APP-ID> <KEY>
npx wrangler flagship flags delete <APP-ID> <KEY>
npx wrangler flagship flags changelog <APP-ID> <KEY>
```

Descriptions:

- `flagship apps create`: Create a Flagship app
- `flagship apps list`: List Flagship apps
- `flagship apps get`: Get a Flagship app
- `flagship apps update`: Update a Flagship app
- `flagship apps delete`: Delete a Flagship app
- `flagship flags create`: Create a feature flag in a Flagship app
- `flagship flags list`: List feature flags in a Flagship app
- `flagship flags get`: Get a feature flag from a Flagship app
- `flagship flags pull`: Pull feature flags from a Flagship app into the local flag store
- `flagship flags update`: Update a feature flag in a Flagship app
- `flagship flags set`: Set the default variation served by a feature flag
- `flagship flags rules list`: List targeting rules for a feature flag
- `flagship flags rules update`: Update one targeting rule for a feature flag
- `flagship flags rules delete`: Delete one targeting rule from a feature flag
- `flagship flags rules reorder`: Reorder targeting rules for a feature flag
- `flagship flags split`: Split traffic across variations by percentage
- `flagship flags rollout`: Roll out one variation to a percentage of traffic
- `flagship flags enable`: Enable a feature flag
- `flagship flags disable`: Disable a feature flag
- `flagship flags evaluate`: Evaluate a feature flag with optional context
- `flagship flags delete`: Delete a feature flag from a Flagship app
- `flagship flags changelog`: Show the changelog for a feature flag

### Authentication

Run `wrangler login`, or set `CLOUDFLARE_API_TOKEN` to an API token with Flagship permissions.

| Permission | Required for |
| --- | --- |
| `flagship:read` | Listing apps, inspecting flags, evaluating flags, and reading changelogs. |
| `flagship:write` | Creating, updating, deleting, enabling, disabling, rolling out, and splitting apps or flags. |

Most write workflows also read the current flag before writing the updated definition, so grant both permissions for operational use.

### App IDs

`wrangler flagship flags` commands always take the app ID as the first argument. Most subcommands then take a flag key; list-style commands, such as `flags list`, take only the app ID:

```sh
wrangler flagship flags get <APP_ID> new-checkout
wrangler flagship flags disable <APP_ID> new-checkout
wrangler flagship flags list <APP_ID>
```

Create an app first if you do not already have one:

```sh
wrangler flagship apps create checkout-service
```

Pass `--binding <NAME>` when creating an app to add it to your `wrangler.json` or `wrangler.jsonc` file as a Worker binding.

### Common workflows

Create a boolean flag. With no variations, Wrangler creates `on=true`, `off=false`, and serves `off` by default:

```sh
wrangler flagship flags create <APP_ID> new-checkout
```

Add targeting rules with the compact rule syntax:

```sh
wrangler flagship flags create <APP_ID> premium-banner \
	-V on=true \
	-V off=false \
	--default off \
	--rule "serve=on; when=plan equals enterprise AND country in [US,CA]; rollout=25%@user_id"
```

Use uppercase `AND` and `OR` outside quoted values to combine conditions. Quote values that contain reserved words or separators:

```sh
wrangler flagship flags create <APP_ID> banner-copy \
	-V shown=true \
	-V hidden=false \
	--default hidden \
	--rule 'serve=shown; when=title equals "WAR AND PEACE" OR country in ["US","CA"]'
```

For deeply nested condition groups, use `--rule-json`. Wrangler validates both compact rules and JSON rules before sending requests.

Change one existing rule without rewriting the full rule set:

```sh
wrangler flagship flags rules update <APP_ID> premium-banner \
	--priority 1 \
	--rollout 50%@user_id
```

Evaluate a flag for a user:

```sh
wrangler flagship flags evaluate <APP_ID> premium-banner \
	--context plan=enterprise \
	--context country=US \
	--targeting-key user-42
```

Use `disable` as an immediate kill switch:

```sh
wrangler flagship flags disable <APP_ID> premium-banner
```

Enable, disable, or delete multiple flags by passing the app ID followed by multiple keys:

```sh
wrangler flagship flags disable <APP_ID> new-checkout dark-mode premium-banner
wrangler flagship flags delete <APP_ID> coming-soon old-banner --force
```

Delete commands require `--force` when used with `--json` so prompts cannot corrupt JSON output. `rollout` and `split` require the same when they would replace existing targeting rules that have conditions.

Refer to the Flagship Wrangler commands reference (https://developers.cloudflare.com/flagship/reference/wrangler-commands/) for a complete workflow guide covering targeting rules, rollouts, traffic splits, changelogs, and scripting with `--json`.

## Options / Props

Flags `--local` / `--remote` / `--persist-to` (local flag store) apply to all `flagship flags` subcommands except `pull` (`--persist-to` only), and `changelog` (none):

| Flag | Type | Description |
| --- | --- | --- |
| `--local` | boolean | Use the local flag store instead of the remote app |
| `--remote` | boolean | Use the remote app instead of the local flag store |
| `--persist-to` | string | Specify directory to use for local persistence |

### `flagship apps create`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the app |
| `--json` | boolean | false | Return output as JSON |
| `--use-remote` | boolean | — | Use a remote binding when adding the newly created resource to your config |
| `--update-config` | boolean | — | Automatically update your config file with the newly added resource |
| `--binding` | string | — | The binding name of this resource in your Worker |

### `flagship apps list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--json` | boolean | false | Return output as JSON |

### `flagship apps get`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `--json` | boolean | false | Return output as JSON |

### `flagship apps update`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `--name` | string (required) | — | The new name of the app |
| `--json` | boolean | false | Return output as JSON |

### `flagship apps delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | One or more app IDs to delete |
| `--force` (alias `--y`) | boolean | false | Skip the confirmation prompt |
| `--json` | boolean | false | Return output as JSON |

### `flagship flags create`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--variation` (alias `--V`) | string | — | A flag variation, in the form "name=value" (repeatable) |
| `--default-variation` (alias `--default`) | string | — | The name of the variation to serve by default (defaults to off for boolean flags, otherwise the first variation) |
| `--type` (alias `--t`) | string | — | The variation value type (inferred when omitted) |
| `--description` (alias `--d`) | string | — | A description of the flag |
| `--disabled` | boolean | false | Create the flag in a disabled state |
| `--rule` | string | — | A targeting rule, e.g. "serve=on; when=plan equals pro AND region in [US,CA]; rollout=30%@user_id". Conditions support AND/OR; priority is optional and defaults to declaration order (repeatable) |
| `--rule-json` | string | — | A targeting rule as a JSON object (repeatable) |
| `--json` | boolean | false | Return output as JSON |
| `--local` | boolean | — | Use the local flag store instead of the remote app |
| `--remote` | boolean | — | Use the remote app instead of the local flag store |
| `--persist-to` | string | — | Specify directory to use for local persistence |

### `flagship flags list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `--limit` | number | — | The maximum number of flags to return (1-200) |
| `--cursor` | string | — | The pagination cursor from a previous list call |
| `--all` | boolean | false | Fetch every flag, following pagination automatically |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags get`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags pull`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app to pull flags from |
| `--persist-to` | string | — | Specify directory to use for local persistence |
| `--json` | boolean | false | Return output as JSON |

### `flagship flags update`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--enable` | boolean | — | Enable the flag |
| `--disable` | boolean | — | Disable the flag |
| `--description` (alias `--d`) | string | — | A new description for the flag (pass "" to clear it) |
| `--default-variation` (alias `--default`) | string | — | The name of the variation to serve by default |
| `--type` (alias `--t`) | string | — | The value type used to coerce --set-variation values |
| `--set-variation` | string | — | Add or replace a variation, in the form "name=value" |
| `--remove-variation` | string | — | Remove a variation by name |
| `--rule` | string | — | Replace the flag's targeting rules (repeatable) |
| `--rule-json` | string | — | Replace the flag's targeting rules using JSON (repeatable) |
| `--add-rule` | string | — | Append a targeting rule, keeping the existing rules (repeatable) |
| `--add-rule-json` | string | — | Append a targeting rule using JSON, keeping the existing rules (repeatable) |
| `--clear-rules` | boolean | false | Remove all targeting rules |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags set`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--variation` (aliases `--variant`, `--V`) | string (required) | — | The variation to serve by default |
| `--clear-rules` | boolean | false | Clear targeting rules so this variation is always served |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags rules list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags rules update`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--priority` | number (required) | — | The priority of the rule to update |
| `--serve` | string | — | The variation to serve when this rule matches |
| `--when` | string | — | The rule conditions, using the same syntax as --rule when=... |
| `--clear-conditions` | boolean | false | Remove conditions so the rule matches all contexts |
| `--rollout` | string | — | The rollout, in the form "percentage" or "percentage%@attribute" |
| `--clear-rollout` | boolean | false | Remove the rollout from this rule |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags rules delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--priority` | number (required) | — | The priority of the rule to delete |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags rules reorder`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--order` | string (required) | — | Comma-separated existing rule priorities in their new order, for example 2,1,3 |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags split`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--weight` (alias `--w`) | string | — | A variation weight, in the form "variation=weight" (repeatable) |
| `--by` | string | — | Context attribute used for sticky bucketing |
| `--default-variation` (alias `--default`) | string | — | Fallback variation when bucketing cannot run |
| `--force` (alias `--y`) | boolean | false | Skip the confirmation prompt when this split replaces existing targeting rules |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags rollout`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--to` | string (required) | — | Variation to roll out |
| `--percentage` | number (required) | — | Percentage of traffic to serve the rollout variation (0-100) |
| `--by` | string | — | Context attribute used for sticky bucketing |
| `--from-variation` (alias `--from`) | string | — | Fallback variation for the remaining traffic |
| `--force` (alias `--y`) | boolean | false | Skip the confirmation prompt when this rollout replaces existing targeting rules |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags enable` / `flagship flags disable`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | One or more flag keys to enable (disable) |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags evaluate`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--context` (aliases `--ctx`, `--C`) | string | — | Evaluation context, in the form "name=value" (repeatable) |
| `--targeting-key` | string | — | Stable bucketing key for percentage rollouts |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | One or more flag keys to delete |
| `--force` (alias `--y`) | boolean | false | Skip the confirmation prompt |
| `--json` | boolean | false | Return output as JSON |
| `--local` / `--remote` / `--persist-to` | — | — | As above |

### `flagship flags changelog`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<APP-ID>` | string (required) | — | The ID of the app |
| `<KEY>` | string (required) | — | The key of the flag |
| `--limit` | number | — | The maximum number of entries to return (1-200) |
| `--cursor` | string | — | The pagination cursor from a previous changelog call |
| `--all` | boolean | false | Fetch every entry, following pagination automatically |
| `--json` | boolean | false | Return output as JSON |

## Notes

- Most `wrangler flagship flags` commands accept `--local` to read and write the local flag store used by `wrangler dev`, the Cloudflare Vite plugin, and `cf dev`. They still default to the remote app. Bindings with `remote: true` do not use the local store, so `--local` changes do not affect them. `wrangler flagship flags pull <APP_ID>` copies remote flags into that store. See Flagship local development docs.
- Docs inconsistency: the official page links `wrangler dev` to the "general" commands page anchor `#dev`, but `dev` is documented on the Workers commands page.
- Flagship binding runtime usage belongs to the cloudflare-workers skill.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Workers](./workers.md)
- [Global flags](./global-flags.md)
