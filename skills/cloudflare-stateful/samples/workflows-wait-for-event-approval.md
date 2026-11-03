---
source: https://developers.cloudflare.com/workflows/examples/wait-for-event/
---

# Workflow: Human-in-the-Loop Approval with waitForEvent

Pause a Workflow until an external approval event arrives, then run an AI tagging step only if approved.

## Signature / Usage

Adapted (not in the official docs): the official page shows only `run()` and refers to undefined `DatabaseService`, `AI_CONFIG`, `WorkflowParams`, and `ApprovalRequest`. Minimal stand-ins are added so the code is self-contained, the `images` table is created with `CREATE TABLE IF NOT EXISTS` before the first insert, and the R2 image is size-checked before it is read into memory; the table, SQL, size cap, and model ID are placeholders. See Notes.

```ts
import {
	WorkflowEntrypoint,
	WorkflowStep,
	WorkflowEvent,
} from "cloudflare:workers";
import { NonRetryableError } from "cloudflare:workflows";

type WorkflowParams = { imageKey: string };
type ApprovalRequest = { approved: boolean };

interface Env {
	DB: D1Database;
	AI: Ai;
	workflow_demo_bucket: R2Bucket;
}

// Placeholder values: choose your own Workers AI vision model and prompt.
const AI_CONFIG = {
	MODEL: "<vision-model-id>",
	PROMPT: "Describe this image as short tags.",
	MAX_TOKENS: 512,
	// Upper bound on the image bytes loaded into memory for one model call.
	MAX_IMAGE_BYTES: 5 * 1024 * 1024,
};

// Placeholder data layer; adapt the table and columns to your schema.
class DatabaseService {
	constructor(private db: D1Database) {}

	async insertImage(imageKey: string, instanceId: string) {
		// Idempotent DDL: safe to run on every (retried) attempt.
		await this.db
			.prepare(
				"CREATE TABLE IF NOT EXISTS images (instance_id TEXT PRIMARY KEY, image_key TEXT NOT NULL, tags TEXT)",
			)
			.run();
		await this.db
			.prepare(
				"INSERT INTO images (instance_id, image_key) VALUES (?, ?) ON CONFLICT(instance_id) DO NOTHING",
			)
			.bind(instanceId, imageKey)
			.run();
	}

	async updateImageTags(instanceId: string, tags: string) {
		await this.db
			.prepare("UPDATE images SET tags = ? WHERE instance_id = ?")
			.bind(tags, instanceId)
			.run();
	}
}

export class MyWorkflow extends WorkflowEntrypoint<Env, WorkflowParams> {
	private db!: DatabaseService;

	async run(event: WorkflowEvent<WorkflowParams>, step: WorkflowStep) {
		this.db = new DatabaseService(this.env.DB);
		const { imageKey } = event.payload;

		await step.do('Insert image name into database', async () => {
			await this.db.insertImage(imageKey, event.instanceId);
		});

		const waitForApproval = await step.waitForEvent('Wait for AI Image tagging approval', {
			type: 'approval-for-ai-tagging',
			timeout: '5 minute',
		});

		const approvalPayload = waitForApproval.payload as ApprovalRequest;
		if (approvalPayload?.approved === true) {
			const aiTags = await step.do('Generate AI tags', async () => {
				const image = await this.env.workflow_demo_bucket.get(imageKey);
				if (!image) throw new Error('Image not found');
				if (image.size > AI_CONFIG.MAX_IMAGE_BYTES) {
					// Do not buffer an oversized object; retrying would not help.
					await image.body.cancel();
					throw new NonRetryableError('Image too large');
				}

				const arrayBuffer = await image.arrayBuffer();
				const uint8Array = new Uint8Array(arrayBuffer);

				const input = {
					image: Array.from(uint8Array),
					prompt: AI_CONFIG.PROMPT,
					max_tokens: AI_CONFIG.MAX_TOKENS,
				};

				const response = await this.env.AI.run(AI_CONFIG.MODEL as any, input);
				return (response as any).description as string;
			});

			await step.do('Update DB with AI tags', async () => {
				await this.db.updateImageTags(event.instanceId, aiTags);
			});
		}
	}
}
```

Wrangler configuration (bindings for Workers AI, the Workflow, R2, and D1):

Adapted (not in the official docs): the official `database_id` value is replaced with a placeholder. See Notes.

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "workflows-waitforevent",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"observability": {
		"enabled": true,
		"head_sampling_rate": 1,
	},
	"ai": {
		"binding": "AI"
	},
	"workflows": [
		{
			"name": "workflows-starter",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow"
		}
	],
	"r2_buckets": [
		{
			"bucket_name": "workflow-demo",
			"binding": "workflow_demo_bucket"
		}
	],
	"d1_databases": [
		{
			"binding": "DB",
			"database_name": "workflows-demo-d1",
			"database_id": "<your-d1-database-id>"
		}
	]
}
```

## Notes

- Adapted from the official docs: stand-in types, `DatabaseService`, and `AI_CONFIG` added; the official `database_id` value was replaced with a placeholder. The insert step first runs `CREATE TABLE IF NOT EXISTS images (...)` with `instance_id` as the primary key, so the table exists on first use and the insert stays idempotent when the step is retried (`ON CONFLICT(instance_id) DO NOTHING`). In production, create the table with a D1 migration instead.
- Adapted from the official docs: the official step calls `image.arrayBuffer()` on the R2 object without checking its size, so an arbitrarily large upload would be buffered (and then copied into an array) in memory. The step now compares `R2ObjectBody.size` with `MAX_IMAGE_BYTES`, cancels the body when it is too large, and throws `NonRetryableError` so the step is not retried. Pick a cap that fits your model's input limit.
- The official check is `approvalPayload?.approved` (truthy); this sample requires the boolean `true`.
- The event is delivered by calling `instance.sendEvent({ type: "approval-for-ai-tagging", payload: { approved: true } })` from another Worker; protect that endpoint with authentication (see the WorkflowInstance reference for a hardened handler).
- If no event arrives within the 5-minute timeout, `waitForEvent` throws and the instance fails unless you wrap the call in `try...catch`. Events sent before the instance reaches the wait are buffered.
- The official example also includes a Next.js frontend and the complete code in https://github.com/cloudflare/docs-examples/tree/main/workflows/waitForEvent ; neither is reproduced here.

## Related

- [Events and parameters](../references/workflows/events-and-parameters.md)
- [WorkflowStep](../references/workflows/workflow-step.md)
- [WorkflowInstance](../references/workflows/workflow-instance.md)
