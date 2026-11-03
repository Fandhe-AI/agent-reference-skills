---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/webhooks/push-notifications/
---

# Push notifications (Web Push from an Agent)

Send browser push notifications from an Agent even when the tab is closed: store subscriptions in agent state, schedule reminders with `this.schedule()`, and deliver with the `web-push` library.

## Signature / Usage

Setup:

```bash
npx web-push generate-vapid-keys
```

```bash
wrangler secret put VAPID_PUBLIC_KEY
wrangler secret put VAPID_PRIVATE_KEY
wrangler secret put VAPID_SUBJECT
```

Agent (trimmed to the delivery path; the full source also has `unsubscribe`):

Adapted (not in the official docs): `subscribe` validates the endpoint (https, allow-listed push hosts, size limits) and `sendReminder` records transient failures and reschedules instead of reporting success; see Notes.

```ts
import { Agent, callable, routeAgentRequest } from "agents";
import webpush from "web-push";

type Subscription = {
	endpoint: string;
	expirationTime: number | null;
	keys: {
		p256dh: string;
		auth: string;
	};
};

type Reminder = {
	id: string;
	message: string;
	scheduledAt: number;
	sent: boolean;
};

type ReminderAgentState = {
	subscriptions: Subscription[];
	reminders: Reminder[];
};

// Allow-list of push-service hosts (extend for the browsers you support).
const PUSH_HOST_SUFFIXES = [
	"fcm.googleapis.com",
	"updates.push.services.mozilla.com",
	"push.apple.com",
	"notify.windows.com",
];

function isAllowedPushEndpoint(sub: Subscription): boolean {
	if (JSON.stringify(sub).length > 2048) return false;
	if (typeof sub?.endpoint !== "string" || sub.endpoint.length > 1024) return false;
	if (typeof sub.keys?.p256dh !== "string" || typeof sub.keys?.auth !== "string") {
		return false;
	}
	let url: URL;
	try {
		url = new URL(sub.endpoint);
	} catch {
		return false;
	}
	return (
		url.protocol === "https:" &&
		!url.username &&
		!url.password &&
		PUSH_HOST_SUFFIXES.some(
			(h) => url.hostname === h || url.hostname.endsWith(`.${h}`),
		)
	);
}

export class ReminderAgent extends Agent<Env, ReminderAgentState> {
	initialState: ReminderAgentState = {
		subscriptions: [],
		reminders: [],
	};

	@callable()
	getVapidPublicKey(): string {
		return this.env.VAPID_PUBLIC_KEY;
	}

	@callable()
	async subscribe(subscription: Subscription): Promise<{ ok: boolean }> {
		// Authenticate the user in the Worker before routing to this Agent.
		if (!isAllowedPushEndpoint(subscription)) {
			throw new Error("Invalid push subscription");
		}
		const exists = this.state.subscriptions.some(
			(s) => s.endpoint === subscription.endpoint,
		);
		if (!exists) {
			this.setState({
				...this.state,
				subscriptions: [...this.state.subscriptions, subscription],
			});
		}
		return { ok: true };
	}

	@callable()
	async createReminder(
		message: string,
		delaySeconds: number,
	): Promise<Reminder> {
		const id = crypto.randomUUID();
		const scheduledAt = Date.now() + delaySeconds * 1000;
		const reminder: Reminder = { id, message, scheduledAt, sent: false };

		this.setState({
			...this.state,
			reminders: [...this.state.reminders, reminder],
		});

		await this.schedule(delaySeconds, "sendReminder", { id, message });
		return reminder;
	}

	async sendReminder(payload: { id: string; message: string }) {
		webpush.setVapidDetails(
			this.env.VAPID_SUBJECT,
			this.env.VAPID_PUBLIC_KEY,
			this.env.VAPID_PRIVATE_KEY,
		);

		const deadEndpoints: string[] = [];
		let failures = 0;

		await Promise.all(
			this.state.subscriptions.map(async (sub) => {
				try {
					await webpush.sendNotification(
						sub,
						JSON.stringify({
							title: "Reminder",
							body: payload.message,
							tag: `reminder-${payload.id}`,
						}),
					);
				} catch (err: unknown) {
					const statusCode =
						err instanceof webpush.WebPushError ? err.statusCode : 0;
					if (statusCode === 404 || statusCode === 410) {
						deadEndpoints.push(sub.endpoint);
					} else {
						// Transient failure (5xx, network): record it so we retry.
						failures++;
						console.error("push delivery failed", statusCode, sub.endpoint);
					}
				}
			}),
		);

		if (deadEndpoints.length > 0) {
			this.setState({
				...this.state,
				subscriptions: this.state.subscriptions.filter(
					(s) => !deadEndpoints.includes(s.endpoint),
				),
			});
		}

		if (failures > 0) {
			// Not marked as sent; retry later (this resends to subscriptions that
			// already succeeded, so the notification `tag` dedupes on the device).
			await this.schedule(60, "sendReminder", payload);
			return;
		}

		this.setState({
			...this.state,
			reminders: this.state.reminders.map((r) =>
				r.id === payload.id ? { ...r, sent: true } : r,
			),
		});

		this.broadcast(
			JSON.stringify({
				type: "reminder_sent",
				id: payload.id,
				timestamp: Date.now(),
			}),
		);
	}
}

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Service worker (`public/sw.js`):

```js
self.addEventListener("push", (event) => {
	if (!event.data) return;

	const data = event.data.json();

	event.waitUntil(
		self.registration.showNotification(data.title || "Notification", {
			body: data.body || "",
			icon: data.icon || "/favicon.ico",
			tag: data.tag,
			data: data.data,
		}),
	);
});
```

Client subscribe:

```ts
function base64urlToUint8Array(base64url: string): Uint8Array {
	const padded = base64url + "=".repeat((4 - (base64url.length % 4)) % 4);
	const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}

async function subscribeToPush(
	agent: ReturnType<typeof useAgent>,
) {
	const permission = await Notification.requestPermission();
	if (permission !== "granted") return;

	const vapidPublicKey = await agent.call("getVapidPublicKey");
	const reg = await navigator.serviceWorker.ready;
	const subscription = await reg.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: base64urlToUint8Array(vapidPublicKey).buffer,
	});

	const subJson = subscription.toJSON();
	await agent.call("subscribe", [
		{
			endpoint: subJson.endpoint,
			expirationTime: subJson.expirationTime ?? null,
			keys: subJson.keys,
		},
	]);
}

await agent.call("createReminder", ["Check the oven", 300]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `VAPID_PUBLIC_KEY` | secret | — | Public VAPID key, returned to the browser |
| `VAPID_PRIVATE_KEY` | secret | — | Private VAPID key |
| `VAPID_SUBJECT` | secret | — | `mailto:` subject for VAPID |
| `compatibility_flags` | wrangler | — | `nodejs_compat` is required for `web-push` |

## Notes

- Adapted from the official docs: (1) the official `subscribe` stored any client-supplied subscription, so the Agent could be made to POST to an attacker-chosen URL (SSRF); it now accepts only https endpoints on allow-listed push-service hosts with size limits, and only authenticated users should reach it. Because `this.state` can be changed by a client `setState()`, keep subscriptions in server-managed SQLite (`this.sql`) in production, or re-run `isAllowedPushEndpoint()` before every send. Do not follow redirects from push services. (2) The official `catch` swallowed every non-404/410 error and still marked the reminder `sent`; transient failures now keep it unsent and reschedule (add a retry cap in production).
- Store VAPID keys in a `.env`/`.dev.vars` file for local dev (add it to `.gitignore`) and with `wrangler secret put` in production.
- Subscriptions kept in `this.state` are synced to every connected client of that Agent, exposing endpoints and keys; use one Agent per user (user ID as the name) and authenticate before routing.
- Handle push-service 404 and 410 by removing the dead subscription; a 5xx can be retried with `this.schedule(60, "retrySendNotification", ...)`.
- Combine `this.broadcast()` for connected clients with Web Push for offline ones. Each device subscription is stored and notified separately.
- Dependency: `npm install agents web-push`. The source wrangler example sets `"assets": { "not_found_handling": "single-page-application" }` and `main: src/server.ts`.

## Related

- [Schedule tasks](./schedule-tasks.md)
- [State](./state.md)
- [Callable methods](./callable-methods.md)
- [Webhooks](./webhooks.md)
