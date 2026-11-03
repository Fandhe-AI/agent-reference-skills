---
source: https://developers.cloudflare.com/containers/examples/cron/
---

# Cron container

Run a short container task every two minutes from a Cron Trigger; the task prints its scheduled time and exits.

## Signature / Usage

`wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "cron-container",
  "main": "src/index.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "observability": {
    "enabled": true
  },
  "triggers": {
    "crons": [
      "*/2 * * * *"
    ]
  },
  "containers": [
    {
      "class_name": "CronContainer",
      "scheduling_policy": "durable_object",
      "images": {
        "base": {
          "dockerfile": "./Dockerfile"
        }
      }
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "CRON_CONTAINER",
        "class_name": "CronContainer"
      }
    ]
  },
  "exports": {
    "CronContainer": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  }
}
```

`src/index.js`:

```js
import { DurableObject } from "cloudflare:workers";

export class CronContainer extends DurableObject {
	currentRun;

	run(startTime) {
		this.currentRun ??= this.runOnce(startTime).finally(() => {
			this.currentRun = undefined;
		});
		return this.currentRun;
	}

	async runOnce(startTime) {
		const container = this.ctx.container;
		if (!container.running) {
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: { MESSAGE: `Scheduled time: ${startTime}` },
			});
		}
		await container.monitor();
	}
}

export default {
	fetch() {
		return new Response("This Worker runs a scheduled Container task.");
	},
	async scheduled(controller, env) {
		await env.CRON_CONTAINER.getByName("cron").run(
			new Date(controller.scheduledTime).toISOString(),
		);
	},
};
```

`Dockerfile` (the task):

```dockerfile
FROM alpine:3.20
CMD ["sh", "-c", "printf '%s\\n' \"$MESSAGE\""]
```

Test locally with Wrangler 4.136.0 or later and a Docker-compatible engine:

```sh
npx wrangler dev --test-scheduled
```

In another terminal, trigger the scheduled handler:

```sh
curl 'http://localhost:8787/__scheduled?cron=*/2+*+*+*+*'
```

## Notes

- All triggers use the same Durable Object. If a run is still active, another trigger waits for it instead of starting a second task. Overlapping runs are not queued and exactly-once execution is not guaranteed; make tasks idempotent when they modify external data.
- `monitor()` reports completion or failure, not HTTP readiness. Keep the task short enough to finish within the Cron Trigger execution limits.
- Check the container logs for the scheduled time. After deployment, Cron Triggers invoke the handler automatically.

## Related

- [Monitor container lifecycle](./status-hooks.md)
- [Durable Object Container API](../references/containers/durable-object-container.md)
- [Local development](../references/containers/local-dev.md)
