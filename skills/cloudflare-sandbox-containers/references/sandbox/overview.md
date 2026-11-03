---
source: https://developers.cloudflare.com/sandbox/
---

# Sandboxes on Cloudflare

A sandbox is an isolated place to run untrusted or generated code. Cloudflare offers two environments, both started from a Worker: Containers (a Linux microVM running your image) and Dynamic Workers (a runtime-created Worker). Available on the Workers Paid plan.

## Signature / Usage

A Durable Object in your Worker starts a container instance from an image and runs a command in it:

```ts
// Runs inside the disposable sandbox container (a microVM), never on the host.
// enableInternet: false keeps untrusted code off the public Internet.
container.start({
	image: "cloudflare/debian-trixie",
	entrypoint: ["sleep", "infinity"],
	enableInternet: false,
});
const process = await container.exec(["uname", "-a"]);
const output = await process.output();
```

Dynamic Workers load untrusted JavaScript/Python/WebAssembly as a new Worker and block its outbound requests:

```ts
const sandbox = env.LOADER.load({
	compatibilityDate: "$today",
	mainModule: "code.js",
	modules: { "code.js": untrustedModule },
	globalOutbound: null,
});
const entrypoint = sandbox.getEntrypoint<CodeEntrypoint>("Code");
const result = await entrypoint.evaluate();
```

## Notes

- The code in a sandbox cannot read the memory or data of your application. Your Worker decides which APIs and data the code receives and whether it reaches the public Internet.
- Containers: any language, long-running processes; HTTP from the Internet reaches the instance only through your Worker. Each instance is a microVM with its own kernel and network. A sandbox container uses the Durable Object scheduling policy (public beta).
- Dynamic Workers: the product is documented at https://developers.cloudflare.com/dynamic-workers/ (no separate skill). TypeScript must be compiled to JavaScript before loading.
- This category documents the current Sandbox SDK line (`@cloudflare/sandbox` 1.x, a helper library used with a container started from a Durable Object). For the old `@cloudflare/sandbox` 0.x line and the migration to 1.x, see the Sandbox SDK 0.x migration pages at https://developers.cloudflare.com/sandbox/sdk/migrate/ (not covered by this category).
- Containers platform details (images, `start()`/`exec()`/snapshot API, pricing, limits, outbound handlers) belong to the `containers` category of this skill. The Durable Objects API itself belongs to the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/).
- Guides in this category: concepts (choose / lifetime / security), commands, files, previews, credentials and network, manage, and coding agents.

## Related

- [Choose a sandbox environment](./choose-a-sandbox-environment.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
- [Sandbox security](./sandbox-security.md)
- [Run a Linux command](./run-a-linux-command.md)
