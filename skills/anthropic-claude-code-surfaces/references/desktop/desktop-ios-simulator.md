<!-- source: https://code.claude.com/docs/en/desktop-ios-simulator.md / last verified: 2026-08-07 -->

# Test iOS apps in the simulator

Claude Code Desktop opens your app in the iOS Simulator pane when Claude builds, runs, or checks it, with a separate simulator for each session. Public beta on macOS, Pro/Max/Team plans only (not Enterprise).

## Signature / Usage

```text
Build the app and run it in the simulator to check the onboarding flow.
```

The pane opens automatically when Claude launches the app in a simulator, in local sessions only. You can also open it manually from the session toolbar's **Views** menu → **iOS Simulator** → **Attach simulator**.

## Options / Props

| Requirement | Value |
|------|-------------|
| Claude Desktop | v1.24012.0 or later |
| OS | macOS only |
| Xcode | With iOS platform installed; use Xcode 26.x (Xcode 27's Device Hub is not yet supported) |

## Notes

- Drives the simulator directly (no computer use / macOS Accessibility or Screen Recording permissions needed); from the CLI, Claude reaches the simulator through computer use instead
- Each device belongs to the session that launched it; up to 4 devices per session; Desktop shuts down simulators it booted when no longer in use (app quit, session archived, or 10 minutes after detach)
- First use of a device requires one-time consent (**Let Claude use it**); opening a URL on the device or building the app (`xcodebuild`) still follows the session's permission mode
- Organization controls: `disableMobileSimulatorTools` managed setting blocks Claude's simulator tools; `requireCoworkFullVmSandbox` disables the pane entirely
- Not available for cloud or SSH sessions (Claude runs on a machine that can't reach the simulators on your Mac); can't control a physical iPhone/iPad

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)
