---
source: https://developers.cloudflare.com/workflows/build/rules-of-workflows/
---

# Rules of Workflows

Best practices for resilient, correct Workflows: idempotent steps, granular steps, durable state, deterministic names, awaited steps, and bounded outputs.

## Signature / Usage

### Make API and binding calls idempotent

Adapted (not in the official docs): the official step returns the raw `Response` from `fetch`, which is not serializable step state, and treats a failed charge as success; it throws on a non-2xx response and returns plain data here (see Notes).

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		const customer_id = 123456;
		// ✅ Good: Non-idempotent API/Binding calls are always done **after** checking if the operation is
		// still needed.
		await step.do(
			`charge ${customer_id} for its monthly subscription`,
			async () => {
				// API call to check if customer was already charged
				const subscription = await fetch(
					`https://payment.processor/subscriptions/${customer_id}`,
				).then((res) => res.json());

				// return early if the customer was already charged, this can happen if the destination service dies
				// in the middle of the request but still commits it, or if the Workflows Engine restarts.
				if (subscription.charged) {
					return;
				}

				// non-idempotent call, this operation can fail and retry but still commit in the payment
				// processor - which means that, on retry, it would mischarge the customer again if the above checks
				// were not in place.
				const res = await fetch(
					`https://payment.processor/subscriptions/${customer_id}`,
					{
						method: "POST",
						body: JSON.stringify({ amount: 10.0 }),
					},
				);
				// Throw on failure so the step retries (the check above makes the retry safe)
				if (!res.ok) {
					throw new Error(`charge failed with status ${res.status}`);
				}
				// Return serializable data, not the Response object
				return { status: res.status };
			},
		);
	}
}
```

### Make steps granular

Adapted (not in the official docs): the official step returns the raw `Response` from `fetch`, which is not serializable step state; it returns the status code here (see Notes).

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// ✅ Good: Unrelated API/Binding calls are self-contained, so that in case one of them fails
		// it can retry them individually. It also has an extra advantage: you can control retry or
		// timeout policies for each granular step - you might not to want to overload http.cat in
		// case of it being down.
		const httpCat = await step.do("get cutest cat from KV", async () => {
			return await this.env.KV.get("cutest-http-cat");
		});

		const image = await step.do("fetch cat image from http.cat", async () => {
			const res = await fetch(`https://http.cat/${httpCat}`);
				return res.status;
		});
	}
}
```

### Keep state in step returns, not outside steps

`getRandomInt` is defined at module scope. Adapted (not in the official docs): the last step returns the response status instead of the raw `Response` (not serializable); see Notes.

```js
function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// ✅ Good: imageList state is exclusively comprised of step returns - this means that in the event of
		// multiple engine lifetimes, imageList will be built accordingly
		const imageList = await Promise.all([
			step.do("get first cutest cat from KV", async () => {
				return await this.env.KV.get("cutest-http-cat-1");
			}),

			step.do("get second cutest cat from KV", async () => {
				return await this.env.KV.get("cutest-http-cat-2");
			}),
		]);

		// A long sleep can (and probably will) hibernate the engine which means that the first engine lifetime ends here
		await step.sleep("💤💤💤💤", "3 hours");

		// When this runs, it will be on the second engine lifetime - but this time, imageList will contain
		// the two most cutest cats
		await step.do(
			"choose a random cat from the list and download it",
			async () => {
				const randomCat = imageList.at(getRandomInt(0, imageList.length));
				// this will eventually succeed since `randomCat` is defined
				const res = await fetch(`https://http.cat/${randomCat}`);
					return res.status;
			},
		);
	}
}
```

### Keep side effects and non-determinism inside steps

`createDBConnection` is a placeholder for your own function. Adapted (not in the official docs): the "good" step returns the new instance's `id` instead of the `WorkflowInstance` stub (not serializable); see Notes.

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// 🔴 Bad: creating instances outside of steps
		// This might get called more than once creating more instances than expected
		const badInstance = await this.env.ANOTHER_WORKFLOW.create();

		// 🔴 Bad: using non-deterministic functions outside of steps
		// this will produce different results if the instance has to restart, different runs of the same instance
		// might go through different paths
		const badRandom = Math.random();

		if (badRandom > 0) {
			// do some stuff
		}

		// ⚠️ Warning: This log may happen many times
		console.log("This might be logged more than once");

		await step.do("do some stuff and have a log for when it runs", async () => {
			// do some stuff

			// this log will only appear once
			console.log("successfully did stuff");
		});

		// ✅ Good: wrap non-deterministic function in a step
		// after running successfully will not run again
		const goodRandom = await step.do("create a random number", async () => {
			return Math.random();
		});

		// ✅ Good: calls that have no side effects can be done outside of steps
		// For Hyperdrive, create the connection inside each step instead of here.
		const db = createDBConnection(this.env.DB_URL, this.env.DB_TOKEN);

		// ✅ Good: run functions with side effects inside of a step
		// after running successfully will not run again
		const goodInstance = await step.do(
			"good step that returns state",
			async () => {
				const instance = await this.env.ANOTHER_WORKFLOW.create();

				return { id: instance.id };
			},
		);
	}
}
```

### Do not mutate incoming events

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// 🔴 Bad: Mutating the event
		// This will not be persisted across steps and `event.payload` will
		// take on its original value.
		await step.do("bad step that mutates the incoming event", async () => {
			let userData = await this.env.KV.get(event.payload.user);
			event.payload = userData;
		});

		// ✅ Good: persist data by returning it as state from your step
		// Use that state in subsequent steps
		let userData = await step.do("good step that returns state", async () => {
			return await this.env.KV.get(event.payload.user);
		});

		let someOtherData = await step.do(
			"following step that uses that state",
			async () => {
				// Access to userData here
				// Will always be the same if this step is retried
			},
		);
	}
}
```

### Name steps deterministically

Adapted (not in the official docs): the official example reads `cat-list` with `KV.get("cat-list")`, which returns a string, and then iterates it as a list; `{ type: "json" }` is added so `catList` is an array, with `?? []` for a missing key (`KV.get` returns `null`).

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// 🔴 Bad: Naming the step non-deterministically prevents it from being cached
		// This will cause the step to be re-run if subsequent steps fail.
		await step.do(`step #1 running at: ${Date.now()}`, async () => {
			let userData = await this.env.KV.get(event.payload.user);
			// Do not mutate event.payload
			event.payload = userData;
		});

		// ✅ Good: give steps a deterministic name.
		// Return dynamic values in your state, or log them instead.
		let state = await step.do("fetch user data from KV", async () => {
			let userData = await this.env.KV.get(event.payload.user);
			console.log(`fetched at ${Date.now()}`);
			return userData;
		});

		// ✅ Good: steps that are dynamically named are constructed in a deterministic way.
		// In this case, `catList` is a step output, which is stable, and `catList` is
		// traversed in a deterministic fashion (no shuffles or random accesses) so,
		// it's fine to dynamically name steps (e.g: create a step per list entry).
		let catList = await step.do("get cat list from KV", async () => {
			return (await this.env.KV.get("cat-list", { type: "json" })) ?? [];
		});

		for (const cat of catList) {
			await step.do(`get cat: ${cat}`, async () => {
				return await this.env.KV.get(cat);
			});
		}
	}
}
```

### Wrap `Promise.race()` / `Promise.any()` in one step

```js
// helper sleep method
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// ✅ Good: The `Promise.race` is surrounded by a single `step.do`, ensuring deterministic
		// caching behavior, and it does not nest `step.do` calls inside the race.
		const race_return = await step.do("race step", async () => {
			return await Promise.race([
				(async () => {
					await sleep(1000);
					return "first";
				})(),
				(async () => {
					return "second";
				})(),
			]);
		});

		await step.sleep("Sleep step", "2 hours");

		return await step.do("Another step", async () => {
			// This step will return `second` because the `Promise.race` was surrounded by the `step.do` method.
			return race_return;
		});
	}
}
```

### Use unique instance IDs

Adapted (not in the official docs): the official example uses `payload`, `getUserId`, `getTransactionId`, and `addNewInstanceToDB` without defining them, takes the user ID from the request, and actually creates the "bad" instance before the good one (a second request with the same user ID then throws). Here the user ID comes from a placeholder `authenticate()` that fails closed, the body is parsed inside `try` and size-checked, and the bad call is shown as a comment. See Notes.

```js
// authenticate, getTransactionId and addNewInstanceToDB are your own functions.
// authenticate() must verify the caller (session, JWT, ...) and return a user ID,
// or null when the request is not authenticated.
export default {
	async fetch(req, env) {
		const userId = await authenticate(req, env);
		if (!userId) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Event payloads are limited to 1 MiB.
		const raw = await req.text();
		if (new TextEncoder().encode(raw).byteLength > 1024 * 1024) {
			return new Response("Payload too large", { status: 413 });
		}
		let payload;
		try {
			payload = JSON.parse(raw);
		} catch {
			return new Response("Body must be JSON", { status: 400 });
		}
		if (typeof payload !== "object" || payload === null) {
			return new Response("Body must be a JSON object", { status: 400 });
		}

		// 🔴 Bad: Use an ID that isn't unique across future Workflow invocations
		// await env.MY_WORKFLOW.create({ id: userId, params: payload });

		// ✅ Good: use an ID that is unique
		// e.g. a transaction ID, order ID, or task ID are good options
		let instanceId = getTransactionId(); // e.g. assuming transaction IDs are unique
		// or: compose a composite ID and store it in your database
		// so that you can track all instances associated with a specific user or merchant.
		instanceId = `${userId}-${crypto.randomUUID().slice(0, 6)}`;
		await addNewInstanceToDB(userId, instanceId);
		let goodInstance = await env.MY_WORKFLOW.create({
			id: instanceId,
			params: payload,
		});

		return Response.json({
			id: goodInstance.id,
			details: await goodInstance.status(),
		});
	},
};
```

### `await` your steps

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// 🔴 Bad: The step isn't await'ed, and any state or errors is swallowed before it returns.
		const badIssues = step.do(`fetch issues from GitHub`, async () => {
			// The step will return before this call is done
			let issues = await getIssues(event.payload.repoName);
			return issues;
		});

		// ✅ Good: The step is correctly await'ed.
		const goodIssues = await step.do(`fetch issues from GitHub`, async () => {
			let issues = await getIssues(event.payload.repoName);
			return issues;
		});

		// Rest of your Workflow goes here!
	}
}
```

### Use deterministic conditions

Adapted (not in the official docs): `config?.enableEmailNotifications` instead of `config.enableEmailNotifications`, because `KV.get` returns `null` when the key is missing. See Notes.

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		const config = await step.do("fetch config", async () => {
			return await this.env.KV.get("feature-flags", { type: "json" });
		});

		// ✅ Good: Condition based on step output (deterministic)
		if (config?.enableEmailNotifications) {
			await step.do("send email", async () => {
				// Send email logic
			});
		}

		// ✅ Good: Condition based on event payload (deterministic)
		if (event.payload.userType === "premium") {
			await step.do("premium processing", async () => {
				// Premium-only logic
			});
		}

		// ✅ Good: Wrap non-deterministic values in a step
		const shouldProcess = await step.do("decide randomly", async () => {
			return Math.random() > 0.5;
		});
		if (shouldProcess) {
			await step.do("conditionally do something", async () => {});
		}
	}
}
```

### Batch Workflow invocations

```js
export default {
	async fetch(req, env) {
		let instances = [
			{ id: "user1", params: { name: "John" } },
			{ id: "user2", params: { name: "Jane" } },
			{ id: "user3", params: { name: "Alice" } },
			{ id: "user4", params: { name: "Bob" } },
		];

		// ✅ Good: Batch calls together
		// This improves throughput.
		let { created, errors } = await env.MY_WORKFLOW.createBatch({ instances });
		return Response.json({
			instances: created.map((instance) => instance.id),
			errors,
		});
	},
};
```

### Keep large outputs out of step returns

`processData` is a placeholder for your own function. Adapted (not in the official docs): the fetch status and the R2 `get` result (which is `null` for a missing key) are checked before use. See Notes.

```js
export class MyWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		// ✅ Good: Store large structured data externally and return a reference
		const dataRef = await step.do("fetch and store large dataset", async () => {
			const response = await fetch("https://api.example.com/large-dataset");
			if (!response.ok) {
				throw new Error(`dataset fetch failed with status ${response.status}`);
			}
			const data = await response.json();
			// Store in R2 and return a reference
			await this.env.MY_BUCKET.put("dataset-123", JSON.stringify(data));
			return { key: "dataset-123" };
		});

		// Retrieve the data in a later step when needed
		const data = await step.do("process dataset", async () => {
			const stored = await this.env.MY_BUCKET.get(dataRef.key);
			if (!stored) {
				throw new Error(`missing R2 object ${dataRef.key}`);
			}
			return processData(await stored.json());
		});
	}
}
```

## Notes

- Corrected from the official docs: step callbacks in four examples returned a raw `Response` (from `fetch`) or a `WorkflowInstance` stub; step return values must be serializable, so they now return `{ status }`, `res.status`, or `{ id }`. `authenticate`, `getTransactionId`, `addNewInstanceToDB` and `getIssues` are placeholders for your own functions.
- Corrected from the official docs: `KV.get("cat-list")` returned a string that was then iterated as a list (fixed with `{ type: "json" }`); the instance-ID example used undefined `payload` and created the "bad" instance before the good one, so the same handler failed on the second request for a user. Examples were also reduced to the JavaScript variants and the "bad" counter-examples were mostly omitted; the full set is on the official page.
- Adapted from the official docs: the instance-ID example takes the user ID from a placeholder `authenticate()` (401 when it returns `null`) instead of the request, parses the body inside `try`, rejects bodies over 1 MiB or that are not JSON objects, and leaves the bad `create` as a comment. The idempotent-charge step throws on a non-2xx response so it is retried; the KV- and R2-backed examples handle a missing key (`null`) and the large-dataset step checks the fetch status.
- Steps may be retried, so make them idempotent: check whether an operation is still needed before a non-idempotent call.
- Do not put the whole logic in one step; do not call separate services or make many service calls in one step (unless needed to prove idempotency); avoid heavy CPU work in one step (the engine may restart it from the beginning); avoid nested steps, especially `step.sleep()` or `step.waitForEvent()` inside `step.do()`.
- The engine can hibernate and lose in-memory state, so state outside steps (like a local array filled inside steps) is lost; rebuild it from step returns. Code outside steps may run more than once (for example a `console.log`). Non-serializable resources such as database connections belong outside steps. With Hyperdrive, create a new connection inside each `step.do()` and query in that step; do not reuse it across steps.
- Step names are cache keys: use deterministic names. Dynamic names are fine when derived from stable step output traversed in a stable order.
- Surround `Promise.race()` / `Promise.any()` with a single `step.do()` and use plain async functions inside (no nested `step.do`); otherwise the cached step may differ from the one returned in the first pass.
- Instance IDs are unique per Workflow; use a composite or random ID and store the mapping (for example in D1) if you need many instances per user.
- Always `await` `step.do` / `step.sleep`; dangling promises swallow errors and lose state.
- Conditions outside steps must depend on deterministic values (`event.payload` or step returns).
- `createBatch` reduces API requests, but each instance still counts toward the creation rate limit; unlike `create`, it reports existing IDs in `errors` instead of throwing.
- Keep step timeouts at 30 minutes or less; use `step.waitForEvent()` for longer waits.
- Non-stream step returns must stay under 1 MiB (2^20 bytes) or the step fails. For JavaScript Workflows a `ReadableStream<Uint8Array>` is a supported return: return a new stream from the callback, keep chunks under 16 MB, do not return a locked or already-read stream, only byte streams (no BYOB). Streamed output still counts toward the instance storage limit; otherwise store externally (for example R2) and return a reference.
- Related official resources: Workers best practices https://developers.cloudflare.com/workers/best-practices/workers-best-practices/ and Rules of Durable Objects [rules-of-durable-objects.md](../durable-objects/rules-of-durable-objects.md) .

## Related

- [workflow-step.md](./workflow-step.md)
- [events-and-parameters.md](./events-and-parameters.md)
- [limits.md](./limits.md)
- [workflow-binding.md](./workflow-binding.md)
