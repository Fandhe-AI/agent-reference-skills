---
source: https://developers.cloudflare.com/workers-ai/models/clef/, https://developers.cloudflare.com/workers-ai/models/clef-flash/, https://developers.cloudflare.com/workers-ai/models/clef-omni/, https://developers.cloudflare.com/workers-ai/models/clairic/
---

# Decision Models (Clef and Clairic)

Cloudflare-authored "System One"-style models that take a `state` plus typed questions or fields and return probabilities and typed answers instead of free text. They are listed under Text Generation on the Workers AI site.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/clef/.

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run("@cf/cloudflare/clef", {
			model: "clef",
			state: "Checkout has been failing for every customer for the last hour.",
			questions: {
				urgent: {
					type: "noul",
					instructions: "Is this support request urgent?",
				},
				team: {
					type: "choice",
					instructions: "Which team should handle this request?",
					criteria: {
						billing: "Payments, invoices, and refunds",
						technical: "Outages, errors, and configuration",
						sales: "Plans and upgrades",
					},
				},
				severity: {
					type: "score",
					instructions: "How severe is the customer impact?",
					criteria: ["No impact", "Minor", "Major", "Critical"],
				},
			},
		});

		// response.answers.urgent   -> probability the request is urgent
		// response.answers.team     -> chosen team with per-option probabilities
		// response.answers.severity -> probability-weighted score (0 = lowest level)
		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;
```

Snippet taken from https://developers.cloudflare.com/workers-ai/models/clairic/.

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run("@cf/cloudflare/clairic", {
			model: "clairic",
			state: "Invoice INV-2291 from Northwind Supply, issued 2026-09-02, net 30. 4 pallets at $250.00 each, shipping $80.00. Contact: Dana Ruiz, Priya Shah.",
			fields: {
				invoice_number: { type: "text" },
				due_date: {
					type: "date",
					instructions: "Issue date plus the net payment days",
				},
				total: {
					type: "number",
					decimals: 2,
					unit: "USD",
					instructions: "Amount due including shipping",
				},
				contacts: { type: "list", items: "text" },
				po_number: { type: "text", instructions: "Purchase order number" },
				days_to_pay: {
					type: "estimate",
					min: 0,
					max: 120,
					step: 1,
					instructions: "Days after issue until this invoice is paid",
				},
			},
		});

		// response.answers.invoice_number -> exact span of the state, with character offsets
		// response.answers.due_date       -> date worked out from the issue date and terms
		// response.answers.po_number      -> null: the invoice has no PO number
		// response.answers.days_to_pay    -> median and 80% interval (p10 to p90)
		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Models

| Model ID | Provider | Context window | Properties as stated | Unit pricing |
|----------|----------|----------------|----------------------|--------------|
| `@cf/cloudflare/clef` | Cloudflare | 65,536 tokens | Vision, Zero data retention; 27B multimodal | $0.24 per M input tokens |
| `@cf/cloudflare/clef-flash` | Cloudflare | 24,576 tokens | Vision, Zero data retention; fast 9B multimodal | $0.038 per M input tokens |
| `@cf/cloudflare/clef-omni` | Cloudflare | 64,000 tokens | Vision, Zero data retention; 30B mixture-of-experts (3B active); reads text, JSON, images, audio, video | $0.15 per M input tokens |
| `@cf/cloudflare/clairic` | Cloudflare | 65,536 tokens | Vision, Zero data retention; preview model | $0.10 per M input tokens |

### Clef family input (`clef`, `clef-flash`, `clef-omni`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| model | string | clef-omni (clef-omni page only) | Required. Selector. clef page: pattern `^\s*(clef\|clef-flash)\s*$`, "clef" for `@cf/cloudflare/clef`, "clef-flash" for `@cf/cloudflare/clef-flash`. clef-omni: pattern `^\s*clef-omni\s*$`. |
| state | string or object/array | — | Required. Content to evaluate: a string, or structured data such as records, chat logs, or application state. Long text state is truncated to fit the model's token limit. |
| questions | object | — | Required, 1 to 64 properties. Map of question id to a typed question (`noul`, `choice`, or `score`). Ids may use letters, digits, `_`, `.`, `-` (max 100 chars). Answers are returned under the same ids. |
| images | array | — | maxItems 4. Optional embedded PNG, JPEG, or WebP images placed before the state (4 MiB and 16 megapixels each, 8 MiB total decoded). Remote URLs are not accepted. Whole request body max 13 MiB (clef, clef-flash). |
| audio | array | — | clef-omni only. maxItems 4; 8 MiB and 300 seconds each. Audio and video together at most 16 MiB decoded. |
| videos | array | — | clef-omni only. maxItems 2; 16 MiB and 60 seconds each, sampled at 2 frames per second. |

Output: `model` (string), `answers` (object keyed by question id), `usage` (object).

### Clairic input

| Name | Type | Default | Description |
|------|------|---------|-------------|
| model | string | clairic | Required. Pattern `^(clairic\|@cf/cloudflare/clairic)$`. |
| state | string | — | The text to read and predict from. Must be non-empty unless images are sent. Text answers are spans of this string. |
| fields | object | — | Required, at least 1 property. Map of field name to a typed field spec. Fields that do not fit next to the state in one 8,192-token pass are split across parallel passes. |
| images | array | — | maxItems 4. Optional embedded PNG, JPEG or WebP images placed before the state (4 MiB each, 8 MiB total decoded, request body max 16 MiB). Remote URLs are not accepted. |
| reference_date | string | — | ISO date that anchors dates written without a year. |
| options | object | — | Not expanded in the source. |

Output: `model`, `answers` (one per field; `value` is null when the input does not determine it), `truncated` (boolean), `state_text`, `usage`.

## Notes

- Clef models convert media inputs to input tokens and bill them at the model's input token rate; they do not charge for output tokens. Images: each side rounded to a multiple of 32 px, area scaled up to about 65,000 px (256x256) minimum and down to about 1 megapixel maximum, one token per 32x32 block, plus 3 marker tokens, capped at 1,024 tokens per image.
- clef-omni media tokens: audio about 780 tokens per minute; video up to about 15,400 tokens per minute at maximum resolution plus about 780 per minute if it has sound (about 8,600 frame tokens per minute for 480p). Each request accepts up to 4 audio clips and 2 videos.
- Media tokens count toward the context window together with the questions; if they exceed it the request fails, otherwise the text `state` is truncated.
- Clairic is described as in preview. Its page carries terms stating Cloudflare may cease providing the model without refund or credit and provides it "AS IS" and "AS AVAILABLE".
- The Clairic example response on its page returns per-field `value`, `confidence`, `p_null`, and for `estimate` fields `median`, `p10`, `p90`, plus `usage` with `state_tokens`, `image_tokens`, `schema_tokens`, `input_tokens`, `output_tokens`, `passes`.

## Related

- [text-generation.md](./text-generation.md)
- [text-generation-parameters.md](./text-generation-parameters.md)
