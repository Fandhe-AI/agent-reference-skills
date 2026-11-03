---
source: https://developers.cloudflare.com/workers/testing/miniflare/core/scheduled/
---

# Scheduled Events (Miniflare)

Trigger `scheduled` events through cron triggers, an HTTP endpoint, or the `getWorker()` API.

## Signature / Usage

```js
const mf = new Miniflare({
	crons: ["15 * * * *", "45 * * * *"],
});
```

HTTP triggers:

Adapted (not in the official docs): `$ ` shell prompt prefixes removed so the commands can be copied; see Notes.

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled"
```

Simulate `scheduledTime` and `cron` with query parameters:

Adapted (not in the official docs): `$ ` shell prompt prefixes removed; see Notes.

```sh
curl "http://localhost:8787/cdn-cgi/local/scheduled?time=1000"
curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*+*+*+*+*"
```

Dispatch via the API:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async scheduled(controller, env, ctx) {
      const lastScheduledController = controller;
      if (controller.cron === "* * * * *") controller.noRetry();
    }
  }
  `,
});

const worker = await mf.getWorker();

let scheduledResult = await worker.scheduled({
	cron: "* * * * *",
});
console.log(scheduledResult); // { outcome: 'ok', noRetry: true }

scheduledResult = await worker.scheduled({
	scheduledTime: new Date(1000),
	cron: "30 * * * *",
});

console.log(scheduledResult); // { outcome: 'ok', noRetry: false }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| scheduledTime | Date | Optional; defaults to the current time |
| cron | string | Optional; defaults to the empty string |

## Notes

- `worker.scheduled()` returns a promise resolving to data about the dispatched event (the page text says "an array containing data returned by all waited promises", but its examples show an object such as `{ outcome: 'ok', noRetry: true }`).
- Adapted from the official docs: the `$ ` prompt prefixes of the `curl` examples were removed.
- The v2 migration page says `crons` was not supported in v3; this page documents it.
- Reference: https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/

## Related

- [get-started.md](./get-started.md)
- [migrating-from-v2.md](./migrating-from-v2.md)
- [../configuration/triggers.md](../configuration/triggers.md)
