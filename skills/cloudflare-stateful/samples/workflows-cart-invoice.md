---
source: https://developers.cloudflare.com/workflows/examples/send-invoices/
---

# Workflow: Pay Cart and Send Invoice

A Workflow that polls D1 until a cart is checked out, charges a payment processor, then emails an invoice, retrying each step independently.

## Signature / Usage

Adapted (not in the official docs): the cart check, the payment request (idempotency key), the example address in a comment, the admin route authentication, and a stale `package.json` pin were changed. See Notes.

```ts
import {
	WorkflowEntrypoint,
	WorkflowStep,
	WorkflowEvent,
} from "cloudflare:workers";
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

// We are using Email Routing to send emails out and D1 for our cart database
type Env = {
	CART_WORKFLOW: Workflow;
	SEND_EMAIL: any;
	DB: any;
};

// Workflow parameters: we expect a cartId
type Params = {
	cartId: string;
};

// Adjust this to your Cloudflare zone using Email Routing
const merchantEmail = "merchant@example.com";

// Uses mimetext npm to generate Email
const genEmail = (email: string, amount: number) => {
	const msg = createMimeMessage();
	msg.setSender({ name: "Pet shop", addr: merchantEmail });
	msg.setRecipient(email);
	msg.setSubject("You invoice");
	msg.addMessage({
		contentType: "text/plain",
		data: `Your invoice for ${amount} has been paid. Your products will be shipped shortly.`,
	});

	return new EmailMessage(merchantEmail, email, msg.asRaw());
};

// Workflow logic
export class cartInvoicesWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		await step.sleep("sleep for a while", "10 seconds");

		// Retrieve the cart from the D1 database
		// if the cart hasn't been checked out yet retry every 2 minutes, 10 times, otherwise give up
		const cart = await step.do(
			"retrieve cart",
			{
				retries: {
					limit: 10,
					delay: 2000 * 60,
					backoff: "constant",
				},
				timeout: "30 seconds",
			},
			async () => {
				const { results } = await this.env.DB.prepare(
					`SELECT * FROM cart WHERE id = ?`,
				)
					.bind(event.payload.cartId)
					.run();
				// should return { checkedOut: true, amount: 250 , account: { email: "customer@example.com" }};
				// D1 returns booleans as 0/1, so test for falsiness rather than `=== false`.
				if (!results[0] || !results[0].checkedOut) {
					throw new Error("cart hasn't been checked out yet");
				}
				return results[0];
			},
		);

		// Proceed to payment, retry 10 times every minute or give up
		const payment = await step.do(
			"payment",
			{
				retries: {
					limit: 10,
					delay: 1000 * 60,
					backoff: "constant",
				},
				timeout: "30 seconds",
			},
			async () => {
				let resp = await fetch("https://payment-processor.example.com/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						// Retries must not charge twice; processors that support idempotency keys dedupe on this.
						// Keyed on the cart (what is being paid for), so a second instance for the same cart reuses it.
						"Idempotency-Key": `cart-${event.payload.cartId}-payment`,
					},
					body: JSON.stringify({ amount: cart.amount }),
				});

				if (!resp.ok) {
					throw new Error("payment has failed");
				}

				return { success: true, amount: cart.amount };
			},
		);

		// Send invoice to the customer, retry 10 times every 5 minutes or give up
		// Requires that cart.account.email has previously been validated in Email Routing,
		// See https://developers.cloudflare.com/email-service/api/route-emails/email-handler/
		await step.do(
			"send invoice",
			{
				retries: {
					limit: 10,
					delay: 5000 * 60,
					backoff: "constant",
				},
				timeout: "30 seconds",
			},
			async () => {
				const message = genEmail(cart.account.email, payment.amount);
				try {
					await this.env.SEND_EMAIL.send(message);
				} catch (e) {
					throw new Error("failed to send invoice");
				}
			},
		);
	}
}

// Default page for admin
// Remove in production

export default {
	async fetch(req: Request, env: Env & { ADMIN_TOKEN?: string }): Promise<Response> {
		// Fail closed: reject when the secret is not configured or does not match.
		const enc = new TextEncoder();
		const expected = env.ADMIN_TOKEN;
		const provided = enc.encode(req.headers.get("Authorization") ?? "");
		const wanted = enc.encode(`Bearer ${expected ?? ""}`);
		if (
			!expected ||
			provided.byteLength !== wanted.byteLength ||
			!crypto.subtle.timingSafeEqual(provided, wanted)
		) {
			return new Response("Unauthorized", { status: 401 });
		}

		let url = new URL(req.url);

		let id = new URL(req.url).searchParams.get("instanceId");

		// Get the status of an existing instance, if provided
		if (id) {
			let instance = await env.CART_WORKFLOW.get(id);
			return Response.json({
				status: await instance.status(),
			});
		}

		if (url.pathname.startsWith("/new")) {
			let instance = await env.CART_WORKFLOW.create({
				params: {
					cartId: "123",
				},
			});
			return Response.json({
				id: instance.id,
				details: await instance.status(),
			});
		}

		return new Response(
			`<html><body><a href="/new">new instance</a> or add ?instanceId=...</body></html>`,
			{
				headers: {
					"content-type": "text/html;charset=UTF-8",
				},
			},
		);
	},
};
```

Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "cart-invoices",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"workflows": [
		{
			"name": "cart-invoices-workflow",
			"binding": "CART_WORKFLOW",
			"class_name": "cartInvoicesWorkflow"
		}
	],
	"send_email": [
		{
			"name": "SEND_EMAIL"
		}
	]
}
```

## Notes

- Corrected from the official docs: the cart check was `results[0].checkedOut === false`; D1 returns `0`/`1`, so it never matched and an unchecked cart would proceed. A missing row also threw a `TypeError`. The check is now `!results[0] || !results[0].checkedOut`.
- Adapted from the official docs: an `Idempotency-Key` header derived from the cart ID (`cart-<cartId>-payment`) was added to the payment call, because the step is retried up to 10 times and a timed-out attempt may have charged the card before its response was lost. Keying on the cart rather than the instance ID also deduplicates a second instance started for the same cart. Whether it is honored, and for how long, depends on your processor; `payment-processor.example.com` is a placeholder. On an ambiguous failure, reconcile with the processor using the same key rather than charging again.
- The `D1` row is assumed to expose `amount` and `account.email`; the official page leaves the schema implicit, so adapt the query to your table.
- Adapted from the official docs: the admin `fetch` handler (marked "Remove in production" in the source) created instances and exposed instance status to any caller; it now requires a bearer token (`ADMIN_TOKEN`, rejected when unset). Set it with `npx wrangler secret put ADMIN_TOKEN`.
- Adapted from the official docs: the payment step is retried up to 10 times, so a processor that does not honor `Idempotency-Key` can charge more than once; check the processor's idempotency support before relying on retries. Workflows does not make a step's side effects exactly-once.
- The invoice step has no idempotency key: if `SEND_EMAIL.send()` succeeds but the step attempt still fails (for example, it times out), the retry sends a duplicate invoice. Record sent invoices (for example, in D1 keyed by cart ID) if duplicates matter.
- Adapted from the official docs: the comment showing the expected row used a personal-looking email address; it is replaced with `customer@example.com`.
- The `cartId` is hard-coded in the sample; take it from authenticated input in a real application. The official `package.json` (pinning Wrangler 3.x) was omitted; install `mimetext` and a current Wrangler.
- The invoice email requires the recipient to be verified in Email Routing.

## Related

- [WorkflowEntrypoint](../references/workflows/workflow-entrypoint.md)
- [WorkflowStep](../references/workflows/workflow-step.md)
- [Sleeping and retrying](../references/workflows/sleeping-and-retrying.md)
- [Workflow binding](../references/workflows/workflow-binding.md)
