<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-sdk / last verified: 2026-10-17 -->

# Browser and computer use (SDK toolsets)

Beta SDK toolset classes (Python and TypeScript) that run the browser use tool or the computer use tool for you: the SDK runs the loop and the checks you configure (URL policy, file policy, `confirm`), and you supply the driver that operates the browser or desktop.

## Signature / Usage

```python
from anthropic import Anthropic
from example_browser_provider import ExampleBrowser  # made-up provider

client = Anthropic()
with ExampleBrowser() as browser:
    runner = client.beta.messages.tool_runner(
        model="claude-opus-5-5",
        max_tokens=1024,
        tools=[browser],
        messages=[
            {"role": "user", "content": "Open example.com and tell me its heading."}
        ],
    )
    for message in runner:
        print(message)
```

TypeScript equivalent:

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { ExampleBrowser } from "example-browser-provider"; // made-up provider

const client = new Anthropic();
const browser = new ExampleBrowser();
try {
  const runner = client.beta.messages.toolRunner({
    model: "claude-opus-5-5",
    max_tokens: 1024,
    tools: [browser],
    messages: [{ role: "user", content: "Open example.com and tell me its heading." }]
  });
  for await (const message of runner) {
    console.log(message);
  }
} finally {
  await browser.close();
}
```

Custom driver skeleton (subclass `BetaAbstractBrowserToolset20260801`; override only the members your browser supports and implement the state report):

```python
from anthropic.tools.browser import (
    BetaAbstractBrowserToolset20260801,
    BetaBrowserNavigateResult,
    BetaBrowserState,
    BetaToolsetCallContext,
)
from anthropic.types.beta import BetaBrowserNavigateInput, BetaBrowserStateTabEntryParam


class MyBrowser(BetaAbstractBrowserToolset20260801):
    def __init__(self, backend, **options):
        super().__init__(**options)
        self.backend = backend

    def _browser_state(self, context: BetaToolsetCallContext) -> BetaBrowserState:
        return BetaBrowserState(
            tabs=[
                BetaBrowserStateTabEntryParam(
                    tab_id=tab.id, title=tab.title, url=tab.url,
                    active=tab.id == self.backend.active,
                )
                for tab in self.backend.tabs()
            ],
            state_changes=self.backend.drain_changes(),
        )

    def navigate(
        self, context: BetaToolsetCallContext, input: BetaBrowserNavigateInput
    ) -> BetaBrowserNavigateResult:
        page = self.backend.goto(input.url, input.tab_id)
        return BetaBrowserNavigateResult(url=page.url, status=page.status, title=page.title)
```

## Options / Props

Constructor options (same meaning in both SDKs; cannot be changed after construction):

| Python | TypeScript | Sets |
| --- | --- | --- |
| `configs` | `configs` | Which members are enabled (`{"read_console": {"enabled": True}}`) |
| `confirm` | `confirm` | Callable that approves (`True`) or refuses (`False`) each call |
| `url_policy` | `urlPolicy` | Called before each `navigate` to a URL; raise `ToolError` (throw in TypeScript) to refuse |
| `file_policy` | `filePolicy` | Upload roots and download path exposure (`BetaLocalFilePolicy` / `BetaNodeFilePolicy`) |
| `tool_configs` | `toolConfigs` | Fields for the `tools` entry, such as `cache_control` |
| `_browser_state` method | `browserState` | The state report (required for a browser driver) |

The browser class takes every option; the computer class (`BetaAbstractComputerToolset20260801`) takes `configs`, `confirm`, and `tool_configs`.

What a browser member returns determines what Claude reads:

| Member | Returns | Claude reads |
| --- | --- | --- |
| `screenshot`, `zoom` | `BetaScreenshotResult` | One image block |
| `navigate` | `BetaBrowserNavigateResult` | `Navigated to {url} — {title} (HTTP {status})` |
| `new_tab`, `switch_tab`, `list_tabs`, `close_tab` | Tab entry, list of tab entries, or nothing | The `browser_state` block alone |
| `read_page`, `get_page_text`, `find`, `read_console`, `read_network`, `javascript_exec` | A string | The string, or `(empty)` |
| Every other member | Nothing, or one line of text | A short confirmation such as `Clicked.`, then the returned line |

Error handling:

| Raised | Claude reads | The run |
| --- | --- | --- |
| `ToolError` | Its message, as an error result | Continues |
| `ToolsetUsageError` | Nothing | Stops |
| Any other exception | `ClassName: message` (Python) / `Error: message` (TypeScript), as an error result | Continues |

## Notes

- The browser toolset class is in beta in the Python and TypeScript SDKs; the computer toolset class is also beta in the same SDKs. Other SDK languages have no toolset class on the source page. The SDK ships no browser, desktop, ready-made driver, or URL policy; you supply them.
- Partner drivers: Browser Use and Browserbase (Stagehand) for the browser toolset, Daytona for the computer toolset, E2B for both. An example CDP browser driver (`browser-toolset`) and a minimal VNC desktop driver (`computer-toolset`) are in the `anthropics/claude-quickstarts` repository; neither is production code.
- Pass the driver instance itself as the `tools` entry (`browser.toJSON()` in TypeScript when calling `messages.create` directly). The runner never closes the toolset; close it yourself. Call `super.close()` first in an overridden `close`.
- In TypeScript write members as methods, not arrow-function fields (the SDK finds them on the prototype), and spell the `type` member `type_`.
- A member you do not implement is sent to the API as disabled; if Claude calls it anyway the SDK returns an error and the run continues. Overriding `execute` makes the SDK count every member as implemented, so disable unsupported members with `configs`. Code before `super().execute` runs after the URL policy, file policy, and `confirm`; the SDK does not re-check input you change.
- `_browser_state` / `browserState` is called after each call that returns a result (including refused and failed calls): return every open tab (exactly one active when any are open) plus `state_changes`. `BetaNavigationRefused` and `BetaDialogDismissed` are reported to Claude as text outside the `browser_state` block. Tab, download, and navigated URLs are cut at 4,096 characters and control characters become spaces; the SDK does not parse them, so `data:` contents, `file:` paths, and URL credentials reach Claude.
- Early start: pass `stream=True` and `run_tools_eagerly=True` (TypeScript: `stream: true`, `runToolsEagerly: true`) to start a call while the response still streams. Checks still run first, calls on one toolset still run one at a time, and a started call cannot be taken back if the response is cut off.
- Without the tool runner, answer each call with `tool_result` / `toolResult`; stop at the first failed call and answer later calls with `Not executed: an earlier action in this turn failed.` (`is_error: true`).
- URL policy: without one the SDK checks no URL, and passing `url_policy=None` (TypeScript `urlPolicy: null`) refuses every `navigate` to a URL. The policy is called only for `navigate`, not for `"back"`, `"forward"`, `"reload"`, clicked links, or redirects. The SDK does not check URL schemes; refuse `javascript:`, `view-source:`, `data:`, `file:` in your driver. Use the driver's request hook plus container egress rules (block loopback, link-local such as `169.254.169.254`, and private ranges) for what the policy cannot see; a hook does not see WebSocket handshakes, service-worker requests, or redirect hops.
- `javascript_exec` and `file_upload` are off by default; enabling either without a `confirm` callable raises a configuration error (TypeScript `confirm: null` refuses every call). `file_upload` also needs a `file_policy`; with none, every upload by path or document ID is refused. Create the download directory yourself with mode `0700`, mounted `noexec,nosuid,nodev`, and never make it an upload root. Do not enable `javascript_exec` unless egress rules restrict the browser to the hosts the task needs.
- Remote and hosted browsers do not share the SDK process's filesystem, so the shipped file policy does not protect them; keep `file_upload` off unless a custom `BetaFilePolicy` checks paths where the browser runs, and refuse downloads. Keep provider API keys and session connection URLs out of logs, results, and error text.
- Isolate the browser host per session (non-root, read-only root filesystem where possible, fresh credential-free profile); run the code that calls the API outside the browser container. Anthropic's prompt-injection classifiers do not currently run on browser toolset requests sent through Amazon Bedrock.
- Computer toolset differences: no URL policy, file policy, or state report; every implemented tool is on by default; implementing `type`, `key`, or `hold_key` (or overriding `execute`) requires a `confirm` callable or those tools turned off with `configs`; after a failed call the runner answers later computer calls with `Not executed: an earlier computer action in this turn failed.`; coordinates are pixels in the screenshots you return, and the SDK never reads or resizes images (the API rejects images over the model's limits). `cursor_position` returns `X={x},Y={y}`. Four tools take no input fields: `screenshot`, `cursor_position`, `left_mouse_down`, `left_mouse_up`.
- With both toolsets in one request, pass both instances in `tools`; calls are routed by `toolset_name` (`browser` or `computer`), and a failure skips only later calls to the same toolset.
- Limitations: calls on one toolset run one at a time (cannot be turned off); an approval is based on the last state report and the page can change afterwards; for computer calls `confirm` receives the tool and input, not the screen; the SDK does not check tab ID uniqueness or tab count (the API rejects a bad report).
- Python also has async classes `BetaAsyncAbstractBrowserToolset20260801` and `BetaAsyncAbstractComputerToolset20260801`.

## Related

- [browser-use-tool](./browser-use-tool.md)
- [computer-use-tool](./computer-use-tool.md)
- [tool-runner](./tool-runner.md)
- [handle-tool-calls](./handle-tool-calls.md)
