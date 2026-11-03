---
source: https://developers.cloudflare.com/workflows/reference/data-location/
---

# Data location (jurisdiction)

Set `jurisdiction` on a Workflow so its instances run and store data only within a region (for example for GDPR or FedRAMP).

## Signature / Usage

```jsonc
{
	"workflows": [
		{
			"name": "my-workflow",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow",
			"jurisdiction": "eu",
		},
	],
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| eu | jurisdiction | — | The European Union |
| us | jurisdiction | — | The United States |
| fedramp | jurisdiction | — | FedRAMP-Moderate data centers |

## Notes

- Workers anywhere can still create and manage instances of a jurisdiction-restricted Workflow; the constraint controls where instances run and persist data. A Workflow's settings are stored outside the jurisdiction. Consider Regional Services (https://developers.cloudflare.com/data-localization/regional-services/) to control where requests are served.
- Setting a jurisdiction requires Wrangler 4.152.0 or above. It also works on a Workflow declared in `exports`.
- The jurisdiction is set when the Workflow is created and cannot be changed. If an existing Workflow has a different jurisdiction, `wrangler deploy` and `wrangler versions upload` stop before uploading. To change it, use a new name or delete the existing Workflow first (deleting also deletes its instances).
- Removing `jurisdiction` from configuration keeps the existing jurisdiction.
- `jurisdiction` cannot be combined with `script_name`; set it on the Worker that defines the Workflow.
- Local development ignores `jurisdiction`. `wrangler workflows describe` shows a Workflow's jurisdiction.

## Related

- [workflow-configuration.md](./workflow-configuration.md)
- [local-development.md](./local-development.md)
