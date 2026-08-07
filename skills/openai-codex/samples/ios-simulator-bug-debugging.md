# Debug in iOS simulator

Use Codex and XcodeBuildMCP to drive your app in iOS Simulator, capture evidence, and iterate toward a fix.

```text
Use the Build iOS Apps plugin and XcodeBuildMCP to reproduce this bug directly in Simulator, diagnose the root cause, and implement a small fix.

Bug report:
[Describe the expected behavior, the actual bug, and any known screen or account setup.]

Constraints:
- First check whether a project, scheme, and simulator are already selected. If not, discover the right Xcode project or workspace, pick the app scheme, choose a simulator, and reuse that setup for the rest of the session.
- Build and launch the app in Simulator, then confirm the right screen is visible with a UI snapshot or screenshot before you start interacting with it.
- Drive the exact reproduction path yourself by tapping, typing, scrolling, and swiping in the simulator. Prefer accessibility labels or IDs over raw coordinates, and re-read the UI hierarchy before the next action when the layout changes.
- Capture evidence while you debug: screenshots for visual state, simulator logs around the failure, and LLDB stack frames or variables if the bug looks like a crash or hang.
- If the simulator is not already booted, boot one and tell me which device and OS you chose. If credentials or a special fixture are required, pause and ask only for that missing input.
- Make the smallest code change that addresses the bug, then rerun the simulator flow and tell me exactly how you verified the fix.

Deliver:
- the reproduction steps Codex executed
- the key screenshots, logs, or stack details that explained the bug
- the code fix and why it works
- the simulator and scheme used for final verification
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). The Build iOS Apps plugin provides an iOS debugger agent that drives simulator setup, build/launch, UI snapshots, taps, gestures, screenshots, log capture, and debugger attachment via XcodeBuildMCP
- Best for: UI bugs reproducible only after a specific tap/scroll/form path; crashes or hangs needing logs, screenshots, view hierarchy state, and a debugger backtrace before editing code
- Observability relies on `Logger`, `OSLog`, LLDB, and Simulator screenshots
