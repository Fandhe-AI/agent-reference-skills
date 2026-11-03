---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#workflows
---

# Workflows Binding and Workflow Exports

Keys for binding Workflows (`workflows`) and declaring Workflows a Worker defines without a binding (`exports` with `type: "workflow"`, requires Wrangler 4.139.0 or above).

## Signature / Usage

```jsonc
{
	"workflows": [
		{
			"binding": "<BINDING_NAME>",
			"name": "<WORKFLOW_NAME>",
			"class_name": "<CLASS_NAME>",
		},
	],
	"exports": {
		"MyWorkflow": {
			"type": "workflow",
			"name": "my-workflow",
			"limits": {
				"steps": 25000,
			},
			"schedules": ["0 * * * *"],
		},
	},
}
```

```toml
[[workflows]]
binding = "<BINDING_NAME>"
name = "<WORKFLOW_NAME>"
class_name = "<CLASS_NAME>"

[exports.MyWorkflow]
type = "workflow"
name = "my-workflow"
schedules = [ "0 * * * *" ]

  [exports.MyWorkflow.limits]
  steps = 25_000
```

## Options / Props

### `workflows` binding

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | Binding name; a valid JavaScript variable name, e.g. `MY_WORKFLOW`. |
| `name` | `string` required | The name of the Workflow. |
| `class_name` | `string` required | The exported Workflow class; must match the class exported from Worker code. |
| `script_name` | `string` optional | Worker script where the Workflow class is defined. Only required if defined in a different Worker. |
| `schedules` | `string[]` optional | Cron schedules that create new instances automatically. Use instead of top-level `triggers.crons` plus a separate `scheduled` handler. Use a Wrangler release that supports Workflow schedules. |
| `default_retention` | `object` optional | How long to retain state of finished instances; applied to instances that do not set their own `retention`. `success_retention` (`string \| number`): instances that complete successfully or are terminated, as a duration string such as `"3 days"` or a whole number of milliseconds. `error_retention` (`string \| number`): instances that end errored, such as `"7 days"`. Capped at the account's retention limit. |
| `jurisdiction` | `string` optional | Jurisdiction instances run and store data in: `"eu"`, `"fedramp"`, `"us"`. Set at creation, cannot be changed afterwards, cannot be combined with `script_name`. Requires Wrangler 4.152.0 or above. |

### Workflow `exports` entries (keyed by class name extending `WorkflowEntrypoint`)

| Name | Type | Description |
|------|------|-------------|
| `type` | `string` required | Set to `"workflow"`. |
| `name` | `string` required | The Workflow name. Two entries in `exports` cannot use the same name. |
| `limits` | `object` optional | `steps` (`number`): maximum number of steps a Workflow instance can run. |
| `schedules` | `string \| string[]` optional | One or more cron schedules that create new instances automatically. |
| `default_retention` | `object` optional | Same `success_retention` / `error_retention` fields as the `workflows` binding. |
| `jurisdiction` | `string` optional | Same values as the `workflows` binding. Requires Wrangler 4.152.0 or above. |

## Notes

- A Workflow can be declared both as a `workflows` binding and as an export. Both must use the same class and cannot set the same field to different values.
- A `workflows` binding to a Workflow in another Worker cannot use the same `name` as a Workflow export in this Worker; Workflow names are unique per account.
- The Worker calls each exported Workflow through `ctx.exports`, keyed by class name.
- Workflows API behavior is documented by the Workflows docs, not here.

## Related

- [bindings-durable-objects.md](./bindings-durable-objects.md)
- [triggers.md](./triggers.md)
