# Browser and desktop drivers

A driver translates allowed tool calls from the Python/Node SDK (`BrowserToolset`, `ComputerToolset`, `ResponsesToolRunner`) into actions in a browser or desktop you control. Use a browser driver when your application can report page text, controls, and tabs; use a computer driver when the model must work from screenshots and coordinates. The SDK sends requests and dispatches calls; your application owns the session, permissions, and cleanup.

## Signature / Usage

Snippet taken from the computer-use guide ("Run your first task", Python) showing a computer driver run with a per-action approval callback and a step bound (the `try` / `finally` is shortened to `tools.close()` cleanup; the rest of the example is omitted):

Adapted (not in the official docs): the official example also verifies the page state and wraps the run in an outer `try` / `finally` that closes the browser; those parts are omitted here, and the inner `finally: tools.close()` is kept.

```python
tools = AsyncComputerToolset(driver)
try:
    response = await tools.run(
        client,
        {
            "model": "gpt-6.1-sol",
            "store": False,
            "input": "Take a screenshot. Open 'Show pickup details' and report the locker and pickup code. Use only screenshots and left clicks.",
        },
        before_action=driver.allowed,
        max_steps=6,
    )
finally:
    tools.close()
```

Python also provides synchronous `BrowserToolset` and `ResponsesToolRunner` classes for synchronous drivers. Node uses `computerOptions` in the run options; Python takes `approve_safety_checks` and `before_action` as `run` keyword arguments.

## Options / Props

### Common controls

| Goal | Where to set it | What to expect |
| --- | --- | --- |
| Limit browser methods | `members` on the toolset constructor | Only selected, implemented methods are exposed |
| Approve browser changes | `confirm` on the constructor | Only an exact `true` / `True` allows the action |
| Restrict navigation | `urlPolicy` (Node) / `url_policy` (Python) | Required if `navigate` or `new_tab` is enabled; checked before `confirm` |
| Approve native computer actions | Node `computerOptions`; Python `approve_safety_checks` and `before_action` | Pending safety checks need explicit approval; the before-action callback can refuse any action |
| Bound a run | `maxSteps` / `max_steps` | Default 20 requests; the final allowed request cannot start new effects |
| Measure usage | `onDiagnostic` / `on_diagnostic` on `ResponsesToolRunner.run` | Records have `api: "responses"`, `stage: "request"`, `reason: "completed"`, `usage` |

Other options: `additionalMembers` / `additional_members` (add optional methods, not combinable with `members`), `confirmReads` / `confirm_reads` (ask before reads; context has `phase: "before_read"` and null state), `supplyOutputs` / `supply_outputs`, `approveMcp` / `approve_mcp`, `stream` + `onEvent` / `on_event`, `eager`, `earlyExecution` / `early_execution`, `beforeEarlyCall` / `before_early_call`, `maxConcurrentCalls` / `max_concurrent_calls` (default 2), `contextBudget` / `context_budget`, `appendUserText` / `append_user_text`, `ledger`.

### Browser driver contract

Implement `state()` (reports `tabs`: `id`, `title`, `url`, `active`) and only the operations you intend to expose. By default 18 methods are exposed when implemented; `list_tabs` is derived from `state()` (do not implement it).

| Method | Arguments | Confirmation |
| --- | --- | --- |
| `navigate` | `url`, `tab_id` | Yes; URL policy |
| `read_page` | `filter` ("all" or "interactive"), `tab_id` | No |
| `get_page_text` | `tab_id` | No |
| `find` | `query`, `tab_id` | No |
| `click` | `target`, `tab_id` | Yes |
| `type` | `text`, `target` (may be null), `tab_id` | Yes |
| `key` | `keys` (strings), `tab_id` | Yes |
| `scroll` | `direction`, nonnegative `amount`, `tab_id` | Yes |
| `scroll_to` | `target`, `tab_id` | Yes |
| `wait_for` | `text`, `timeout_ms`, `tab_id` | No |
| `select_option` | `target`, `values`, `tab_id` | Yes |
| `hover` | `target`, `tab_id` | Yes |
| `screenshot` | `tab_id` | No |
| `zoom` | `region` `[left, top, right, bottom]`, `tab_id` | No |
| `new_tab` | `url` (may be null) | Yes; URL policy |
| `list_tabs` | none | No |
| `switch_tab` / `close_tab` | required `tab_id` | Yes |

Opt-in (off by default): `read_page_scoped`, `click_at`, `drag_path`, `hold_keys`, `hover_at`, `set_checked` (all fields required; pointer methods use CSS pixels of the full visible area; all but the scoped read need confirmation), and `read_diagnostics`, `run_script`, `upload_file`, `download_file` (need `confirm`; file methods take only a caller-issued `grant_id` and return `BrowserFileOutcome`: `version` 1, `status`, `effect`, `cleanup`). `wait_for` text is at most 256 UTF-8 bytes and timeout 1 to 30,000 ms; `hold_keys` takes 1 to 8 keys and `duration_ms` 1 to 3000; `drag_path` takes 2 to 100 points.

Structured reads (`BrowserReadV1`): `version: 1`, `text`, `elements` (unique `ref`, `label`, role one of `button`, `textbox`, `combobox`, `checkbox`, `radio`, `slider`, `listbox`), and `omitted` codes. Refs and labels have a 256-byte limit; values 512 bytes.

### Computer driver contract

Implement `click`, `double_click`, `drag`, `keypress`, `move`, `scroll` (coordinates, `scroll_x`, `scroll_y`), `type`, `wait`, and `screenshot` (no argument; returns a `computer_screenshot` with `image_url` or `file_id`). Action methods receive the generated action object with snake-case fields, return no value, and must raise an error if they cannot execute the action. Actions run once, in order, and the final screenshot is captured after them; the helper does not retry driver actions. Use synchronous methods with `ComputerToolset` and `async def` methods with `AsyncComputerToolset`.

## Notes
- Adapted from the official docs: the "Run your first task" Python snippet is an excerpt; `tools.close()` releases the toolset only, and the application must still close the browser or desktop session itself (as the official example does with `browser.close()`).

- Approvals: create drivers and callbacks in trusted application code. `confirm` approves fixed action arguments only; its `state` is a prior observation, not a lock on the document or focus, so the driver must check the original target at execution. Disable `key` and refuse `type` with a null target when consent is tied to a specific control. For computer calls, `approveSafetyChecks` / `approve_safety_checks` must return exactly true before any action runs; a missing or declined callback stops the run. A model choice or completion message cannot grant approval.
- URL policy: parse the URL and compare protocol, hostname, and port; do not rely on a string prefix (`https://example.com.evil.test` must not match `https://example.com`). Also enforce a network policy in the browser or environment, since the callback cannot restrict redirects, popups, page scripts, or embedded resources.
- Cleanup: a helper rejects overlapping calls with a busy error; `close()` returns `closed` or `draining` (await the original execute call if draining). The helper does not close your browser or desktop.
- Failures: throw `BrowserError` only with model-safe text; other operation errors produce a generic failure message and the runner skips remaining browser operations in that response. Invalid results or state stop the run. `ResponsesToolRunner` preserves `tool_choice` and rejects a choice that always requires a local tool; use `auto`.
- Missed clicks: use the same coordinate space for screenshot and action; for an 800 x 600 screenshot from a 1600 x 1200 display, double the coordinates, and add a crop offset after scaling.
- Troubleshooting: import failure means checking the installed package version (`openai==3.31.0` or `openai@7.33.0` or later); if Chromium cannot launch, install it in the same environment and do not turn off the sandbox; for step-limit failures verify the page or file first, and simplify the task before raising `maxSteps`.
- Streaming and resume: runs are non-streaming by default. Enable `eager` only if a completed item can safely run before full-response validation. For durable recovery supply a `ledger`; resume only from a completed boundary, and reconcile pending or uncertain actions first. Runs with MCP tools disable automatic SDK retries and save a pending checkpoint that cannot resume automatically.
- SDK validation does not prove the environment performed an action correctly; check the saved form, file, or application record before reporting success. The browser example does not implement or verify a native desktop; the full desktop examples use an isolated Linux guest.
- Source: https://developers.openai.com/api/docs/guides/tools-computer-use-sdk-drivers (fetched 2026-11-14).

## Related

- [Computer Use](./computer-use.md)
- [Computer use integration recipes](./computer-use-integration.md)
