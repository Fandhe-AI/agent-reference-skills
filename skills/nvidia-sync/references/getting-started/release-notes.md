# Release Notes

NVIDIA Sync release history, newest version first. The NVIDIA Sync application links to this page from its Release Notes menu entry.

## Signature / Usage

```text
Component     Version
NVIDIA Sync   0.148.0-153   (Current Version)
```

## Notes

- **0.148.0-153 (current)** What's New:
  - Model Launcher: NVIDIA Sync can set up a model on a supported DGX Spark, a Spark cluster, or a single DGX Station. You start, stop, and check the model in NVIDIA Sync. Model Launcher is a beta feature.
  - OpenCode: Model setup installs OpenCode and skills for the device, and sets OpenCode up to use the local model.
  - Docker group access: After you add a device with a username and password, NVIDIA Sync can ask to add that user to the device's existing docker group. Confirm adds the user. Skip leaves the account unchanged. Membership in the docker group can grant root-level control of the device.
  - Codex: NVIDIA Sync can open a remote folder in the Codex desktop app. Install Codex desktop version 26.818.22352 or later on your laptop.
- 0.148.0-153 Fixed Issues:
  - Versioned VS Code on Windows: NVIDIA Sync detects VS Code installations whose launcher uses a versioned folder.
  - Special characters in folder paths: opening a remote folder no longer fails when the path contains special characters.
  - Main-window banners stay tall enough for their content when the window has many items.
  - Tailscale enrollment on macOS: the enrollment terminal stays open until enrollment finishes.
  - Custom port cleanup: closing a custom port stops the remote processes for that port, including a cleanup that failed earlier.
  - Cluster Assistant on a slow connection: NVIDIA Sync prepares every node's probe before topology discovery starts, so a slow connection to one node does not use up another node's discovery time.
  - Network test latency phase: the Cluster Assistant network test shows the latency phase while that phase is running.
  - Cluster Assistant device rename: renaming a device updates the device name and its SSH alias together.
  - Custom app launch: a custom app no longer stays stuck launching when its address check does not finish. Each check stops after two seconds.
  - Disconnect: a device stays disconnected after you disconnect it. A status check that was already running no longer connects it again.
  - Onboarding window: after you reach device detection, the onboarding window no longer returns to an earlier onboarding step because a device was added from Settings.
  - Tailscale browser sign-in: the sign-in screen says the browser can take a few minutes to open. If you close the browser too soon, select Resend the request.
  - Cluster delete: if one node fails while you delete a cluster, NVIDIA Sync continues the delete and shows that node's error.
  - Onboarding after you add a device from Settings: adding or importing a device from Settings completes onboarding, so the onboarding window does not open again on the next launch.
  - Smaller interface and wording corrections.
- **0.117.3-9** What's New: Resource Monitor reports CPU, memory, and GPU utilization for a single device or a cluster; node-to-node SSH configuration files now include aliases for the ConnectX-7 sub-interface IP addresses.
- 0.117.3-9 Fixed Issues:
  - Cluster Assistant documentation links now point to valid pages.
  - Device discovery no longer lists the local machine.
  - Stale managed SSH aliases are repaired more reliably.
  - The same host can be added more than once using a different user account each time.
  - Windows: selecting the system tray icon no longer redisplays the window unexpectedly.
  - The What's New menu entry is now a Release Notes link.
  - Cluster Assistant adds a UUID to the generated netplan configuration so tombstone records do not block later netplan applies.
  - DGX Spark system software detection no longer fails because of system localization.
  - Connections that use mDNS now return authentication errors correctly.
  - Windows: opening NVIDIA Sync from the taskbar no longer closes an active connection.
  - Code editors no longer launch twice.
  - Minor user interface improvements.
- **0.100.19-18** What's New: the rename step of the Cluster Assistant includes an action that disconnects a device.
- 0.100.19-18 Fixed Issues:
  - Cursor always opens remote folders in IDE mode.
  - Clearer tooltip for renaming a connected device.
  - Cluster Assistant displays the missing cable indicator whenever a cable is absent.
  - Clearer messaging and working links on the final Cluster Assistant setup page and several other screens.
  - The Cluster Assistant labels the Speed field as Link Speed.
  - Operation timeouts are reported more clearly.
- **0.100.18** Upgrade note: this release includes a dependency update that might prompt you to allow NVIDIA Sync to access information stored in NVIDIA Sync Safe Storage. The prompt is expected; select Always Allow to prevent it from appearing again.
- 0.100.18 What's New:
  - JetBrains Toolbox support: NVIDIA Sync launches applications through JetBrains Toolbox.
  - System update notifications in the DGX Dashboard application.
  - Session logging for DGX Spark devices.
- 0.100.18 Fixed Issues:
  - The Cluster Assistant no longer reports a version check error on devices running the July 2026 update or later.
  - Updates no longer overwrite the default SSH configuration file.
  - NVIDIA Sync starts under Xwayland, which corrects system tray positioning on Ubuntu 26.04.
  - Corrects Windows packaging problems related to NSIS 7z filters.
  - The Cluster Assistant no longer flashes a loading state briefly during cluster setup.
  - Terminal applications are supported on Ubuntu 26.04.
  - Tildes are expanded when importing an existing SSH configuration file.
  - Improved local network probe timing and methodology on macOS.
  - The same device can no longer be added twice under a different device name.
  - The Searching For Devices step is no longer skipped when a device is already connected.
  - Uses the current VS Code Insiders download URL.
  - Tailscale unexpected error messages include more detail.
  - Corrects several minor user interface regressions.
- **0.97.6** What's New:
  - Cluster Assistant: automatically configures and validates GB10 clusters over ConnectX-7.
  - Multiple concurrent connections: connects to more than one device at a time.
  - Local port collisions are detected and resolved automatically.
  - Renaming a device also updates its SSH alias entry.
  - Existing device names are migrated so that they link to SSH aliases.
  - Links to a documentation site.
- 0.97.6 Fixed Issues:
  - Custom ports are handled correctly across multiple devices.
  - Renaming a device no longer produces a duplicate device name.
  - The maximum device name length is enforced when renaming.
  - The port field in the add device form can be cleared.
  - Corrects problems introduced by identifying devices with the SSH alias rather than the device hostname.
  - The hostname is passed when creating a Workbench context.
  - Corrects Tailscale naming and device renaming problems.
  - Corrects reconnect problems with multiple devices and flickering on the settings page.
  - macOS no longer opens an extra terminal window in some cases; window positioning corrected.
  - Windows: corrects the timeout that hides the window; the main pop-up window no longer jitters on Windows 11.
  - Input fields no longer flash white when the window opens.
- Source: https://docs.nvidia.com/sync/latest/release-notes.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [overview.md](./overview.md)
- [limitations.md](./limitations.md)
