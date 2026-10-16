# Browser CDP Supervisor

The CDP supervisor holds a persistent WebSocket to the browser backend's CDP endpoint per browser task to detect native JS dialogs and to interact with cross-origin iframes (OOPIFs).

## Signature / Usage

```text
browser_dialog(action, prompt_text=None, dialog_id=None)
```

- `action="accept"` / `"dismiss"` responds to the specified or sole pending dialog (required)
- `prompt_text=...` text supplied to a `prompt()` dialog
- `dialog_id=...` disambiguates when multiple dialogs are queued

`browser_snapshot` gains three optional fields when a supervisor is attached:

```json
{
  "pending_dialogs": [
    {"id": "d-1", "type": "alert", "message": "Hello", "opened_at": 1650000000.0}
  ],
  "recent_dialogs": [
    {"id": "d-1", "type": "alert", "message": "...", "opened_at": 1650000000.0,
     "closed_at": 1650000000.1, "closed_by": "remote"}
  ],
  "frame_tree": {
    "top": {"frame_id": "FRAME_A", "url": "https://example.com/", "origin": "https://example.com"},
    "children": [
      {"frame_id": "FRAME_B", "url": "about:srcdoc", "is_oopif": false},
      {"frame_id": "FRAME_C", "url": "https://ads.example.net/", "is_oopif": true, "session_id": "SID_C"}
    ],
    "truncated": false
  }
}
```

Trusted plugin CDP access (in-process only):

```python
from tools.browser_supervisor import SUPERVISOR_REGISTRY
from tools.browser_supervisor_capture import CapturedCDPInvalid

cdp = SUPERVISOR_REGISTRY.capture(task_id)  # raises CapturedCDPInvalid if no attached supervisor
reply = cdp.call("Runtime.evaluate", {"expression": "document.title", "returnByValue": True},
                 session_id=cdp.page_session_id, timeout=5)
title = reply["result"]["result"]["value"]
```

## Options / Props

Backend support:

| Backend | Dialog detect | Dialog respond | Frame tree | OOPIF `Runtime.evaluate` via `browser_cdp(frame_id=...)` |
|---|---|---|---|---|
| Local Chrome (`--remote-debugging-port`) / `/browser connect` | yes | yes | yes | yes |
| Browserbase | yes (via bridge) | yes (via bridge) | yes | yes |
| Camofox | no (REST-only) | no | partial via DOM snapshot | no |

`config.yaml` `browser.dialog_policy` (per task; defaults and `browser.dialog_timeout_s` in `hermes_cli/config.py`):

| Policy | Behavior |
|--------|----------|
| `must_respond` (default) | Capture, surface in `browser_snapshot`, wait for `browser_dialog`; auto-dismiss and log after a 300 s safety timeout |
| `auto_dismiss` | Record and dismiss immediately |
| `auto_accept` | Record and accept (e.g. `beforeunload`) |

`CapturedCDP.call(method, params=None, *, session_id=None, timeout=10.0, before_send=None) -> dict`; `SUPERVISOR_REGISTRY.capture(task_id, *, timeout=10.0) -> CapturedCDP`.

## Notes

- Browserbase's CDP proxy auto-dismisses native dialogs within ~10 ms, so the supervisor injects a bridge script (`Page.addScriptToEvaluateOnNewDocument`) overriding `window.alert` / `confirm` / `prompt` with a synchronous XHR to `hermes-dialog-bridge.invalid`; `Fetch.enable` intercepts it and `respond_to_dialog` fulfills via `Fetch.fulfillRequest`. `pending_dialogs` is empty on Browserbase; use `recent_dialogs` (`closed_by`: `agent`, `auto_policy`, `watchdog`, `remote`; ring buffer of 20).
- `CDPSupervisor` is one `asyncio.Task` in a background daemon thread per `task_id`, tracking a dialog queue, frame tree, session map and the last 50 console errors. It subscribes to `Page.enable`, `Runtime.enable` and `Target.setAutoAttach {autoAttach: true, flatten: true}`.
- Lifecycle: `SupervisorRegistry.get_or_start(task_id, cdp_url)` (idempotent) from `browser_navigate`, Browserbase session create, `/browser connect`; stopped on session teardown or `/browser disconnect`; reconnects with backoff (<=10 s) and gives up after `MAX_POST_ATTACH_RECONNECT_FAILURES`; a changed CDP URL replaces the supervisor.
- `frame_tree` is capped at 30 entries plus OOPIF depth 2 (`truncated: true` when hit); use `browser_cdp` with `Page.getFrameTree` for the full tree. For same-origin iframes use `contentWindow` / `contentDocument` from a top-level `Runtime.evaluate`.
- `browser_dialog` and the snapshot fields are gated on `_browser_cdp_check`; hidden on Camofox / no-backend sessions.
- `CapturedCDP.call` blocks its thread (never call from the supervisor's own event loop); a CDP error reply raises `RuntimeError`, no reply in time raises `TimeoutError`; `is_valid()` stays true until the supervisor reconnects, stops or is replaced. This seam is not exposed as a model tool, has no config switch and enforces no origin or consent policy.
- Files: `tools/browser_supervisor.py`, `tools/browser_supervisor_capture.py`, `tools/browser_dialog_tool.py`, `tools/browser_tool.py`, `toolsets.py`, `hermes_cli/config.py`.
- Non-goals: Camofox support, live streaming of dialog/frame events to the user, persisting dialog history across sessions, per-iframe policies, replacing `browser_cdp`.

## Related

- [Tools Runtime](./tools-runtime.md)
- [Agent Loop](./agent-loop.md)
