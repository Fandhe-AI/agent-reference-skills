---
source: https://developers.cloudflare.com/workers/
---

# Cloudflare Workers Overview

A serverless platform for building, deploying, and scaling apps across Cloudflare's global network with a single command. This page also folds in the Workers glossary.

## Signature / Usage

Minimal module Worker (the default `fetch()` handler flow):

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

Snippet taken from https://developers.cloudflare.com/workers/reference/how-workers-works/#compute-per-request.

## What you can build

| Use case | Entry point |
| --- | --- |
| Front-end applications | Deploy static assets (https://developers.cloudflare.com/workers/static-assets/) to Cloudflare's CDN & cache |
| Back-end applications | Build APIs and connect to data stores with Smart Placement (https://developers.cloudflare.com/workers/configuration/placement/) |
| Serverless AI inference | Workers AI (https://developers.cloudflare.com/workers-ai/) |
| Background jobs | Cron Triggers (https://developers.cloudflare.com/workers/configuration/cron-triggers/), Workflows (https://developers.cloudflare.com/workflows/), Queues (https://developers.cloudflare.com/queues/) |
| Observability & monitoring | Real-time logs (https://developers.cloudflare.com/workers/observability/logs/) and analytics |

Frameworks, languages: React, Vue, Svelte, Next, Astro, React Router, fate (https://developers.cloudflare.com/workers/framework-guides/); JavaScript, TypeScript, Python, Rust, and anything compiling to WebAssembly.

## Integrate with Workers (bindings)

Connect to external services via Bindings (https://developers.cloudflare.com/workers/runtime-apis/bindings/).

| Group | Product | Description |
| --- | --- | --- |
| Storage | Durable Objects (https://developers.cloudflare.com/durable-objects/) | Scalable stateful storage for real-time coordination |
| Storage | D1 | Serverless SQL database built for fast, global queries |
| Storage | KV | Low-latency key-value storage for fast, edge-cached reads |
| Storage | Queues (https://developers.cloudflare.com/queues/) | Guaranteed delivery with no charges for egress bandwidth |
| Storage | Hyperdrive | Connect to your external database with accelerated queries, cached at the edge |
| Compute | Workers AI (https://developers.cloudflare.com/workers-ai/) | Machine learning models powered by serverless GPUs |
| Compute | Workflows (https://developers.cloudflare.com/workflows/) | Durable, long-running operations with automatic retries |
| Compute | Vectorize (https://developers.cloudflare.com/vectorize/) | Vector database for AI-powered semantic search |
| Compute | R2 | Zero-egress object storage for cost-efficient data access |
| Compute | Browser Run (https://developers.cloudflare.com/browser-run/) | Programmatic serverless browser instances |
| Media | Cache / CDN (https://developers.cloudflare.com/cache/) | Global caching for high-performance, low-latency delivery |
| Media | Images (https://developers.cloudflare.com/images/) | Streamlined image infrastructure from a single API |

For KV, D1, R2, and Hyperdrive, see the cloudflare-storage skill.

## Glossary

| Term | Definition |
| --- | --- |
| Auxiliary Worker | A Worker created locally via the Workers Vitest integration (https://developers.cloudflare.com/workers/testing/vitest-integration/) that runs in a separate isolate to the test runner, with a different global scope. |
| binding | Bindings allow your Workers to interact with resources on the Cloudflare Developer Platform. |
| C3 | A command-line tool (`create-cloudflare`) designed to help you set up and deploy new applications to Cloudflare. |
| CPU time | The amount of time the central processing unit (CPU) actually spends doing work, during a given request. |
| Cron Triggers | Allow users to map a cron expression to a Worker using a `scheduled()` handler that enables Workers to be executed on a schedule. |
| D1 | Cloudflare's native serverless database. |
| deployment | Deployments track the version(s) of your Worker that are actively serving traffic. |
| Durable Objects | A globally distributed coordination API with strongly consistent storage. |
| duration | A measurement of wall-clock time — the total amount of time from the start to end of an invocation of a Worker. |
| environment | Allow you to deploy the same Worker application with different configuration for each environment. Only available for use with a Wrangler configuration file. |
| environment variable | A type of binding that allow you to attach text strings or JSON values to your Worker. |
| handler | Methods on Workers that can receive and process external inputs, and can be invoked from outside your Worker. |
| isolate | Lightweight contexts that provide your code with variables it can access and a safe environment to be executed within. |
| KV | Workers KV is Cloudflare's key-value data storage. |
| module Worker | Refers to a Worker written in module syntax. |
| origin | Generally refers to the web server behind Cloudflare where your application is hosted. |
| Pages | Cloudflare's product offering for building and deploying full-stack applications. |
| Queues | Integrates with Cloudflare Workers and enables you to build applications that can guarantee delivery. |
| R2 | An S3-compatible distributed object storage designed to eliminate the obstacles of sharing data across clouds. |
| rollback | A way to deploy an older deployment to the Cloudflare global network. |
| secret | A type of binding that allow you to attach encrypted text values to your Worker. |
| service Worker | Refers to a Worker written in service worker syntax. |
| subrequest | Any request that a Worker makes to either Internet resources using the Fetch API or requests to other Cloudflare services like R2, KV, or D1. |
| Tail Worker | Receives information about the execution of other Workers (known as producer Workers), such as HTTP statuses, data passed to `console.log()` or uncaught exceptions. |
| V8 | Chrome V8 is a JavaScript engine, which means that it executes JavaScript code. |
| version | Defined by the state of code as well as the state of configuration in a Worker's Wrangler file. |
| wall-clock time | The total amount of time from the start to end of an invocation of a Worker. |
| workerd | A JavaScript / Wasm server runtime based on the same code that powers Cloudflare Workers (https://github.com/cloudflare/workerd). |
| Wrangler | The Cloudflare Developer Platform command-line interface (CLI) that allows you to manage projects, such as Workers, created from the Cloudflare Developer Platform product offering. |
| wrangler.toml / wrangler.json / wrangler.jsonc | The configuration used to customize the development and deployment setup for a Worker or a Pages Function. |

## Notes

- Also covers the Workers glossary from https://developers.cloudflare.com/workers/glossary/ (definitions kept; inline links reduced to plain text).
- The overview page itself contains no code; the snippet above is borrowed from the How Workers works page.
- Wrangler configuration details belong to the cloudflare-wrangler skill; KV / D1 / R2 / Hyperdrive belong to the cloudflare-storage skill.
- Glossary source trailer "View more terms" is a page artifact and not transcribed.

## Related

- [how-workers-works.md](./how-workers-works.md)
- [limits.md](./limits.md)
- [pricing.md](./pricing.md)
- [storage-options.md](./storage-options.md)
- [../handlers-context/README.md](../handlers-context/README.md)
- [../bindings-rpc/README.md](../bindings-rpc/README.md)
