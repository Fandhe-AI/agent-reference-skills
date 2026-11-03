---
source: https://developers.cloudflare.com/durable-objects/examples/reference-do-name-using-init/
---

# Durable Object Metadata with RpcTarget

Pass per-caller metadata (such as the name used with `idFromName()`) to a Durable Object method through an `RpcTarget`.

## Signature / Usage

Adapted (not in the official docs): the private helper's result is awaited before it is logged. See Notes.

```ts
import { DurableObject, RpcTarget } from "cloudflare:workers";

//  * Create an RpcDO class that extends RpcTarget
//  * Use this class to set the Durable Object metadata
//  * Pass the metadata in the Durable Object methods
//  * @param mainDo - The main Durable Object class
//  * @param doIdentifier - The identifier of the Durable Object

export class RpcDO extends RpcTarget {
	constructor(
		private mainDo: MyDurableObject,
		private doIdentifier: string,
	) {
		super();
	}

	//  * Pass the user's name to the Durable Object method
	//  * @param userName - The user's name to pass to the Durable Object method

	async computeMessage(userName: string): Promise<string> {
		// Call the Durable Object method and pass the user's name and the Durable Object identifier
		return this.mainDo.computeMessage(userName, this.doIdentifier);
	}

	//  * Call the Durable Object method without using the Durable Object identifier
	//  * @param userName - The user's name to pass to the Durable Object method

	async simpleGreeting(userName: string) {
		return this.mainDo.simpleGreeting(userName);
	}
}

//  * Create a Durable Object class
//  * You can use the RpcDO class to set the Durable Object metadata

export class MyDurableObject extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
	}

	//  * Initialize the RpcDO class
	//  * You can set the Durable Object metadata here
	//  * It returns an instance of the RpcDO class
	//  * @param doIdentifier - The identifier of the Durable Object

	async setMetaData(doIdentifier: string) {
		return new RpcDO(this, doIdentifier);
	}

	//  * Function that computes a greeting message using the user's name and DO identifier
	//  * @param userName - The user's name to include in the greeting
	//  * @param doIdentifier - The identifier of the Durable Object

	async computeMessage(
		userName: string,
		doIdentifier: string,
	): Promise<string> {
		console.log({
			userName: userName,
			durableObjectIdentifier: doIdentifier,
		});
		return `Hello, ${userName}! The identifier of this DO is ${doIdentifier}`;
	}

	//  * Function that is not in the RpcTarget
	//  * Not every function has to be in the RpcTarget

	private async notInRpcTarget() {
		return "This is not in the RpcTarget";
	}

	//  * Function that takes the user's name and does not use the Durable Object identifier
	//  * @param userName - The user's name to include in the greeting

	async simpleGreeting(userName: string) {
		// Call the private function that is not in the RpcTarget
		console.log(await this.notInRpcTarget());

		return `Hello, ${userName}! This doesn't use the DO identifier.`;
	}
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		let id: DurableObjectId = env.MY_DURABLE_OBJECT.idFromName(
			new URL(request.url).pathname,
		);
		let stub = env.MY_DURABLE_OBJECT.get(id);

		//  * Set the Durable Object metadata using the RpcTarget
		//  * Notice that no await is needed here

		const rpcTarget = stub.setMetaData(id.name ?? "default");

		// Call the Durable Object method using the RpcTarget.
		// The DO identifier is passed in the RpcTarget
		const greeting = await rpcTarget.computeMessage("world");

		// Call the Durable Object method that does not use the Durable Object identifier
		const simpleGreeting = await rpcTarget.simpleGreeting("world");

		// Clean up the RpcTarget.
		try {
			(await rpcTarget)[Symbol.dispose]?.();
			console.log("RpcTarget cleaned up.");
		} catch (e) {
			console.error({
				message: "RpcTarget could not be cleaned up.",
				error: String(e),
				errorProperties: e,
			});
		}

		return new Response(greeting, { status: 200 });
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Adapted from the official docs: `console.log(this.notInRpcTarget())` became `console.log(await this.notInRpcTarget())` so the string, not a Promise, is logged.
- If the caller used `getByName()` or `idFromName()`, read the name inside the object from `this.ctx.id.name`; this pattern is for metadata not available on `ctx.id`, or when `ctx.id.name` is `undefined` (for example with `idFromString()`).
- Calling `stub.setMetaData(...)` without `await` and invoking methods on the result uses RPC promise pipelining.
- The official page has a second variant that persists the identifier with `this.ctx.storage.put("doIdentifier", ...)` instead of passing it through the `RpcTarget`.
- The object name comes from the raw URL path; validate or authenticate it in a real application.
- Requires a `MY_DURABLE_OBJECT` binding to class `MyDurableObject` with a migration. `Env` is not declared in the snippet; it is the global type generated by `npx wrangler types` (or declare `interface Env { MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject> }` yourself).

## Related

- [ID](../references/durable-objects/id.md)
- [Stub](../references/durable-objects/stub.md)
- [Base class](../references/durable-objects/base-class.md)
