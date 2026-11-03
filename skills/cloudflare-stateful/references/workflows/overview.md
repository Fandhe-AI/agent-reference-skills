---
source: https://developers.cloudflare.com/workflows/
---

# Cloudflare Workflows overview

Workflows build durable multi-step applications on Cloudflare Workers: steps persist state, retry automatically, and can pause for seconds, hours, or weeks (available on Workers Free and Paid plans).

## Signature / Usage

Adapted (not in the official docs): the official overview example calls `step.waitForEvent` with an `event:` key and an untyped class; `waitForEvent` takes `type` (see Notes). The `Env` bindings and unused `description` are made explicit.

```ts
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";

type Params = { imageKey: string };

export class ImageProcessingWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		const imageData = await step.do("fetch image", async () => {
			const object = await this.env.BUCKET.get(event.payload.imageKey);
			if (!object) throw new Error("image not found");
			return await object.arrayBuffer();
		});

		const description = await step.do("generate description", async () => {
			const imageArray = Array.from(new Uint8Array(imageData));
			return await this.env.AI.run("@cf/llava-hf/llava-1.5-7b-hf", {
				image: imageArray,
				prompt: "Describe this image in one sentence",
				max_tokens: 50,
			});
		});

		await step.waitForEvent("await approval", {
			type: "approved",
			timeout: "24 hours",
		});

		await step.do("publish", async () => {
			await this.env.BUCKET.put(`public/${event.payload.imageKey}`, imageData);
		});

		return description;
	}
}
```

## Notes

- Corrected from the official docs: the overview example passes `{ event: 'approved', ... }` to `step.waitForEvent`; the Workers API reference defines the option as `type` (matched by `instance.sendEvent({ type, payload })`). The example also returned nothing from `run` and did not check that the R2 object exists; `imageData` (an `ArrayBuffer`) must stay under the 1 MiB non-stream step-result limit, so this sample only suits small images.
- Workflows give: durable multi-step execution without timeouts, pausing for external events or approvals, automatic retries and error handling, and built-in observability.
- Typical uses named by the docs: reliable AI applications, data pipelines, user lifecycle (emails, trial expirations), and human-in-the-loop approvals.
- Workflows (Cloudflare Workers durable execution) is a different product from the `inngest` skill (Inngest durable functions).
- `wrangler workflows` flags are documented in the cloudflare-wrangler skill; Vitest workflow introspection is documented in the cloudflare-wrangler skill (vitest-integration). Related products: Durable Objects ([overview.md](../durable-objects/overview.md)), Queues (overview.md (https://developers.cloudflare.com/queues/)), and the Agents SDK (cloudflare-agents skill (agents; https://developers.cloudflare.com/agents/)).

## Related

- [get-started.md](./get-started.md)
- [workflow-entrypoint.md](./workflow-entrypoint.md)
- [workflow-step.md](./workflow-step.md)
- [limits.md](./limits.md)
- [pricing.md](./pricing.md)
