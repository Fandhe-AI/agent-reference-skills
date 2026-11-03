---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#triggers
---

# Triggers

Triggers define the `cron` expression to invoke your Worker's `scheduled` function.

## Signature / Usage

```jsonc
{
	"triggers": {
		"crons": ["* * * * *"],
	},
}
```

```toml
[triggers]
crons = [ "* * * * *" ]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `crons` | `string[]` required | An array of `cron` expressions. |

## Notes

- To disable a Cron Trigger, set `crons = []`. Commenting out the `crons` key will not disable a Cron Trigger.
- Supported cron expression syntax and `scheduled` handler behavior are covered by the cloudflare-workers skill.
- Workflows can also take cron `schedules` directly; see [bindings-workflows.md](./bindings-workflows.md).

## Related

- [top-level-keys.md](./top-level-keys.md)
- [bindings-workflows.md](./bindings-workflows.md)
