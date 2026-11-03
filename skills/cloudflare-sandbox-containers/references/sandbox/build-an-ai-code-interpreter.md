---
source: https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/
---

# Build an AI code interpreter

A Worker answers questions by running code: a Workers AI model writes JavaScript, a Dynamic Worker runs it without network access, and the model uses the result. Errors are sent back so the model can fix its code.

## Signature / Usage

Install and bind (`npm i agents ai @ai-sdk/provider zod`, then `npx wrangler types`):

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "sandbox-code-interpreter",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"observability": {
		"enabled": true,
	},
	"upload_source_maps": true,
	"ai": {
		"binding": "AI",
	},
	"worker_loaders": [
		{
			"binding": "LOADER",
		},
	],
}
```

`src/sandbox.ts` loads code into a new Dynamic Worker and throws if it does not finish within five seconds:

```ts
import type { WorkerEntrypoint } from "cloudflare:workers";

export type Output = {
	result?: unknown;
	logs: string[];
};

type CodeEntrypoint = WorkerEntrypoint & {
	run(): Promise<Output>;
};

const timeoutMs = 5_000;

export async function runJavaScript(env: Env, code: string): Promise<Output> {
	// Model-generated code is untrusted: it runs only inside this Dynamic Worker.
	const sandbox = env.LOADER.load({
		compatibilityDate: "2026-11-03",
		mainModule: "code.js",
		modules: {
			"code.js": `
				import { WorkerEntrypoint } from "cloudflare:workers";

				function format(value) {
					return typeof value === "string" ? value : JSON.stringify(value);
				}

				export class Code extends WorkerEntrypoint {
					async run() {
						const logs = [];
						const console = {
							log: (...values) => logs.push(values.map(format).join(" ")),
						};
						const result = await (async () => {
							${code}
						})();
						return { result, logs };
					}
				}
			`,
		},
		globalOutbound: null,
		limits: { cpuMs: 50 },
	});

	let timer: number | null = null;
	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(() => {
			reject(new Error(`The code did not finish within ${timeoutMs} ms`));
		}, timeoutMs);
	});

	try {
		return await Promise.race([
			sandbox.getEntrypoint<CodeEntrypoint>("Code").run(),
			timeout,
		]);
	} finally {
		clearTimeout(timer);
	}
}
```

`src/index.ts` gives the model a `runJavaScript` tool:

```ts
import { generateText, isStepCount, tool } from "ai";
import { createAI } from "agents/models/ai-sdk";
import { z } from "zod";
import { runJavaScript, type Output } from "./sandbox";

const model = "@cf/openai/gpt-oss-120b";

const Question = z.object({ question: z.string().min(1) });

const instructions = `Answer the question.
Always call the runJavaScript tool before you answer. Do not calculate, count, or sort in your head.
Write the body of an async JavaScript function and return the value you need.
If the tool returns an error, fix the code and run it again.
Answer in one or two plain-text sentences.`;

type Run = { code: string } & ({ output: Output } | { error: string });

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Authenticate callers here before spending Workers AI quota.
		if (request.method !== "POST") {
			return new Response("Send a POST request", { status: 405 });
		}

		const body = Question.safeParse(await request.json().catch(() => null));

		if (!body.success) {
			return Response.json(
				{ error: "Send a JSON body with a question" },
				{ status: 400 },
			);
		}

		const ai = createAI({ binding: env.AI });
		const runs: Run[] = [];

		try {
			const result = await generateText({
				model: ai(model),
				instructions,
				prompt: body.data.question,
				tools: {
					runJavaScript: tool({
						description:
							"Run JavaScript in a sandbox with no network access. The code is the body of an async function. Return a JSON-serializable value. console.log output is captured.",
						inputSchema: z.object({
							code: z.string().describe("Body of an async JavaScript function"),
						}),
						execute: async ({ code }) => {
							try {
								const output = await runJavaScript(env, code);
								runs.push({ code, output });
								return output;
							} catch (error) {
								const message =
									error instanceof Error ? error.message : String(error);
								runs.push({ code, error: message });
								return { error: message };
							}
						},
					}),
				},
				// Stop after five model steps, so a model that keeps failing cannot
				// run code indefinitely
				stopWhen: isStepCount(5),
			});

			return Response.json({ answer: result.text, runs });
		} catch (error) {
			console.error("Model request failed", error);
			return Response.json(
				{ error: "The model request failed. Try again later.", runs },
				{ status: 502 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

Test (on your machine):

```sh
curl http://localhost:8787 --json '{"question":"How many prime numbers are there below 100,000?"}'
```

## Notes

- Dynamic Worker limits: `globalOutbound: null` makes `fetch()`/`connect()` throw; no `env` is passed, so the code cannot reach Workers AI or any other resource; `limits: { cpuMs: 50 }` stops CPU hogs; the five-second timer runs in your Worker so generated code cannot change it; each `load()` is a new Dynamic Worker, so values do not carry over. The generated code is the body of an async function (can `await`, must `return`); a local `console` collects `console.log` output. The code can modify anything inside the Dynamic Worker including the wrapper, but nothing it does not receive.
- Errors (thrown, CPU limit, timeout, `fetch()`) are returned to the model as `{ error }`. Request bodies are validated with Zod; a Workers AI failure (for example a rate limit) logs and returns `502` with the code already run.
- Under `wrangler dev` the Dynamic Worker runs locally but Workers AI requests always run on Cloudflare and count toward usage. The response shape is `{ "answer": "...", "runs": [{ "code": "...", "output": { "result": 9592, "logs": [] } }] }`.
- The Worker is unauthenticated in the official tutorial: anyone with the URL can use your Workers AI allowance; authenticate callers before sharing it.
- Workers AI, the Agents SDK (`agents`), and the AI SDK are not part of this category. Dynamic Workers: https://developers.cloudflare.com/dynamic-workers/ ; Code Mode: cloudflare-agents skill (tools) ; Workers AI: cloudflare-ai skill (workers-ai) ; the `ai` package is the vercel-ai-sdk skill.

## Related

- [Run JavaScript in a Dynamic Worker](./run-javascript-dynamic-workers.md)
- [Choose a sandbox environment](./choose-a-sandbox-environment.md)
- [Sandbox security](./sandbox-security.md)
