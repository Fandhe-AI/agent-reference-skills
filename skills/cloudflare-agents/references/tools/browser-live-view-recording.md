---
source: https://developers.cloudflare.com/agents/tools/browser/
---

# Browser Live View, recording, and closing

Hand a persistent browser to a person (login, MFA, CAPTCHA, sensitive input), record sessions as rrweb events for audit, and close the browser.

## Signature / Usage

Return Live View links from your application, after authenticating the user:

```ts
export class BrowserAssistant extends DurableObject<Env> {
	// Browser, harness, and lifecycle as in the Pi Durable example.

	async getLiveView() {
		const view = await this.browser.liveView({ mode: "tab" });
		if (!view) {
			return [];
		}

		return view.targets
			.filter((tab) => tab.pageUrl?.startsWith("http"))
			.map((tab) => ({
				title: tab.title,
				pageUrl: tab.pageUrl,
				liveViewUrl: tab.url,
			}));
	}
}
```

Turn on recording and fetch it after the session closes:

```ts
export class BrowserAssistant extends DurableObject<Env> {
	browser = new Browser({
		provider: browserRun(this.env.BROWSER, { recording: true }),
	});
}
```

```ts
import { getBrowserRecording } from "agents/browser";

// While the browser is open. resolve() starts a browser if none is open.
const { sessionId } = await this.browser.resolve();

// After the browser closes:
const recording = await getBrowserRecording({
	accountId: this.env.CF_ACCOUNT_ID,
	apiToken: this.env.CF_API_TOKEN,
	sessionId,
});
// recording.events holds one rrweb event array per tab, keyed by target ID.
```

```ts
await this.browser.close();
```

## Options / Props

`browser.liveView()` result:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sessionId` | string | — | The Browser Run session ID. |
| `targets` | array | — | One entry per open tab: `targetId`, Live View `url`, current `pageUrl`, `title`, `type`. |
| `expiresInMs` | number | — | How long the Live View URLs remain valid for starting a connection (about five minutes). |

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"tab"` or `"devtools"` | Browser Run default view | Interactive page view or full DevTools inspector. |
| `recording` | boolean | — | In `browserRun` options; applies to every browser the `Browser` creates, including replacements. |
| `getBrowserRecording({ accountId, apiToken, sessionId })` | function | — | Fetches a finalized recording via the Browser Run REST API. |

## Notes

- `liveView()` lists every open tab across all scopes and does not start a browser (returns `undefined` if none is open or it expired). `browserTool` does not pause a run while a person acts; hand off between turns: the model asks for help, your app shows the link, the user finishes the step, the next turn continues with the new cookies.
- Live View URLs are bearer credentials: anyone with a link controls the browser and logged-in sites. Show them only to trusted, authenticated users; never give them to the model or store them; call `liveView()` again for fresh links. Human-in-the-loop for destructive or sensitive steps belongs at this handoff or in approval-gated tools.
- `close()` deletes the Browser Run session, returns `false` if none was open; the next use starts a new browser and each scope's `notice` reports its state is gone.
- A recording captures DOM changes, input, and navigation (not video), is finalized when the session closes (`browser.close()` or idle past `keepAliveMs`), is retained 30 days, and is capped at two hours per session. The Workers binding cannot read recordings; the REST call needs the account ID and an API token with Browser Run access. Keep `CF_API_TOKEN` as a secret, not in config or tool arguments.
- A recording spans every turn and scope sharing the `Browser`, so one shared browser can capture several users. rrweb masks inputs by default, but treat every recording as sensitive.
- Docs: https://developers.cloudflare.com/browser-run/features/live-view/ and https://developers.cloudflare.com/browser-run/features/session-recording/

## Related

- [Browser](./browser.md)
- [Browser legacy tools](./browser-legacy.md)
