---
source: https://developers.cloudflare.com/workflows/examples/backup-d1/
---

# Workflow: Scheduled D1 Backup to R2

A cron-scheduled Workflow that starts a D1 export through the REST API, polls until the dump is ready, and streams it into R2.

## Signature / Usage

```ts
import {
	WorkflowEntrypoint,
	WorkflowStep,
	WorkflowEvent,
} from "cloudflare:workers";

// We are using R2 to store the D1 backup
type Env = {
	BACKUP_WORKFLOW: Workflow;
	D1_REST_API_TOKEN: string;
	BACKUP_BUCKET: R2Bucket;
	ACCOUNT_ID: string;
	DATABASE_ID: string;
};

// Workflow logic
export class backupWorkflow extends WorkflowEntrypoint<Env> {
	async run(_event: WorkflowEvent<unknown>, step: WorkflowStep) {
		const accountId = this.env.ACCOUNT_ID;
		const databaseId = this.env.DATABASE_ID;

		const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/export`;
		const method = "POST";
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", `Bearer ${this.env.D1_REST_API_TOKEN}`);

		const bookmark = await step.do(
			`Starting backup for ${databaseId}`,
			async () => {
				const payload = { output_format: "polling" };

				const res = await fetch(url, {
					method,
					headers,
					body: JSON.stringify(payload),
				});
				const { result } = (await res.json()) as any;

				// If we don't get `at_bookmark` we throw to retry the step
				if (!result?.at_bookmark) throw new Error("Missing `at_bookmark`");

				return result.at_bookmark;
			},
		);

		await step.do("Check backup status and store it on R2", async () => {
			const payload = { current_bookmark: bookmark };

			const res = await fetch(url, {
				method,
				headers,
				body: JSON.stringify(payload),
			});
			const { result } = (await res.json()) as any;

			// The endpoint sends `signed_url` when the backup is ready to download.
			// If we don't get `signed_url` we throw to retry the step.
			if (!result?.signed_url) throw new Error("Missing `signed_url`");

			const dumpResponse = await fetch(result.signed_url);
			if (!dumpResponse.ok) throw new Error("Failed to fetch dump file");

			// Finally, stream the file directly to R2
			await this.env.BACKUP_BUCKET.put(result.filename, dumpResponse.body);
		});
	}
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		return new Response("Not found", { status: 404 });
	},
};
```

Wrangler configuration (daily schedule via `schedules`):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "backup-d1",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"vars": {
		"ACCOUNT_ID": "account-id",
		"DATABASE_ID": "database-id"
	},
	"workflows": [
		{
			"name": "backup-workflow",
			"binding": "BACKUP_WORKFLOW",
			"class_name": "backupWorkflow",
			"schedules": ["0 0 * * *"]
		}
	],
	"r2_buckets": [
		{
			"binding": "BACKUP_BUCKET",
			"bucket_name": "d1-backups"
		}
	]
}
```

Store the API token as a secret (prompted on stdin):

```sh
npx wrangler secret put D1_REST_API_TOKEN
```

## Notes

- Each scheduled run creates a new Workflow instance; scheduled instances carry the cron expression and trigger time on `event.schedule`.
- Use a current Wrangler release; if your local schema does not recognize `schedules`, update Wrangler before deploying.
- The token needs permission to export the target D1 database. The `ACCOUNT_ID` and `DATABASE_ID` values in `vars` are placeholders.
- The steps use default retry settings: a missing `at_bookmark` or `signed_url` throws, so the step retries until the export is ready or retries are exhausted.
- The signed URL and bearer token are sensitive; do not log them.

## Related

- [Workflow configuration](../references/workflows/workflow-configuration.md)
- [WorkflowStep](../references/workflows/workflow-step.md)
- [Sleeping and retrying](../references/workflows/sleeping-and-retrying.md)
