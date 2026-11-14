<!-- source: https://code.claude.com/docs/en/desktop-ios-simulator.md / last verified: 2026-11-14 -->

# Test iOS apps in the simulator

Claude Code Desktop opens your app in the iOS Simulator pane when Claude builds, runs, or checks it. Public beta on macOS; available on Pro, Max, Ultra, Team, and Enterprise plans, except Enterprise organizations with a HIPAA configuration enabled, and not with a third-party provider.

## Signature / Usage

```text
Build the app and run it in the simulator to check the onboarding flow.
```

The pane opens automatically when Claude launches the app in a simulator, in local sessions only. You can also open it yourself: once the session has a simulator attached or Claude Code detects iOS app work, an **iOS Simulator** button appears in the session's title bar; click **Attach simulator** (or pick a device from the device menu next to it; picking a shut-down device boots it). To target a specific device, name it in the request, for example "run it on the iPhone SE simulator".

## Options / Props

| Requirement | Value |
|------|-------------|
| Claude Desktop | v1.24012.0 or later |
| OS | macOS only |
| Xcode | With the iOS platform installed; Xcode 26.x or Xcode 27 is recommended and the pane works with either |

If more than one Xcode is installed, the pane uses the one `xcode-select` points at.

```bash
sudo xcode-select -s /Applications/Xcode-26.4.app
```

Check the selected install with `xcode-select -p`, then quit and reopen Claude Desktop so the pane uses the newly selected Xcode.

## Notes

- Drives the simulator directly: no computer use and no macOS Accessibility or Screen Recording permissions needed; from the CLI, Claude reaches the simulator through computer use instead
- Local sessions only; not available in cloud or SSH sessions (Claude runs on a machine that can't reach the simulators on your Mac). Claude drives simulated devices only, not a physical iPhone or iPad
- Controlling the simulator yourself: tap and swipe on the screen; **Cmd+Shift+H** Home, **Cmd+L** lock, **Cmd+Up Arrow** / **Cmd+Down Arrow** volume; **Cmd+Right Arrow** rotates a quarter turn clockwise; **Cmd+S** screenshot and **Cmd+R** screen recording (saved to your Desktop); **Detach simulator** stops streaming without shutting the device down. If a **Display** menu is shown, lower **Frame rate** or **Resolution** if the pane strains your Mac
- You and Claude drive the same device; while the **Claude is using this device** badge shows, hold off tapping
- Closing or minimizing the pane keeps the device attached and usable by Claude; click **iOS Simulator** in the title bar to show it again
- If the prompt doesn't name a simulator, Claude uses one that's already running, even one opened by another parallel session; name a different simulator per session to separate them
- Desktop shuts down simulators it booted when you quit the app, archive the session, or 10 minutes after you detach a device; devices booted outside Desktop (Simulator app, Device Hub) are never shut down automatically. The pane's shutdown button shuts down the attached device right away
- Consent: the first time Claude uses a device, the desktop app asks you to allow it (once per device, not per session). Screenshots are sent to Anthropic and kept under your normal conversation retention settings, so don't sign in to real accounts on that device. If you decline, click **Attach simulator**, **Continue**, then **Cancel** in the following dialog to use the device yourself; click **Let Claude use it** later to give Claude access
- Three actions still follow the session's permission mode after you allow a device: opening a URL on the device, building the app (`xcodebuild`; checking an in-progress build doesn't prompt), and installing and launching the app
- Turn off access in the desktop app's settings, or organization-wide: `disableMobileSimulatorTools` managed setting blocks Claude's simulator tools (the pane stays usable for your own taps and the app can't override it); `requireCoworkFullVmSandbox` disables the pane and Claude's simulator tools entirely
- Troubleshooting: if the pane doesn't open, state the goal explicitly ("run the app in the iOS Simulator and tap through the signup flow"), confirm Xcode and iOS simulators are installed, check for policy, HIPAA, or third-party provider restrictions, and update to v1.24012.0 or later. If it says no simulators were found, download the iOS simulator runtime from Xcode's settings or run `xcodebuild -downloadPlatform iOS`
- Source: https://code.claude.com/docs/en/desktop-ios-simulator.md (fetched 2026-11-14)

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)
