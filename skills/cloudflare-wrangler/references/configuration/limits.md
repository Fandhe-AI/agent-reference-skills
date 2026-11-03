---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#limits
---

# Limits

Impose limits on your Worker's behavior at runtime.

## Signature / Usage

```jsonc
{
	"limits": {
		"cpu_ms": 100,
		"subrequests": 150,
	},
}
```

```toml
[limits]
cpu_ms = 100
subrequests = 150
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cpu_ms` | `number` optional | The maximum CPU time allowed per invocation, in milliseconds. |
| `subrequests` | `number` optional | The maximum number of subrequests allowed per invocation. Defaults to 50 for free accounts and 10,000 for paid accounts. The free account maximum is 50 and the paid account maximum is 10,000,000. |

## Notes

- Limits are only supported for the Standard Usage Model.
- Limits are only enforced when deployed to Cloudflare's network, not in local development.
- The CPU limit can be set to a maximum of 300,000 milliseconds (5 minutes).
- Each isolate has some built-in flexibility to allow for cases where your Worker infrequently runs over the configured limit. If your Worker starts hitting the limit consistently, its execution will be terminated according to the limit configured.
- Platform limits themselves are documented by the cloudflare-workers skill.

## Related

- [top-level-keys.md](./top-level-keys.md)
