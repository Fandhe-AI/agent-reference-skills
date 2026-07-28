# Accessibility testing

Verifying accessibility combines automated checks in CI with targeted manual assistive-technology testing (primarily Narrator) for high-risk scenarios, using inspection tools to confirm the correct UI Automation properties, patterns, and events are exposed.

## Signature / Usage

Testing Narrator with keyboard and mouse:

1. Start Narrator: **Windows logo key + Ctrl + Enter**.
2. Navigate with `Tab`, arrow keys, and `Caps Lock + arrow keys`.
3. Verify Narrator reads each control's visible content, name, applicable state (checked/selected/etc.), and control type.
4. Press `Caps Lock + Enter` to invoke an interactive element via Narrator.
5. Press `Caps Lock + Shift + Enter` to search the app and confirm controls appear with localized, readable names.
6. Turn off the monitor and try to complete main scenarios using only the keyboard and Narrator.

Enable Narrator developer mode with `Control + Caps Lock + F12` to mask the screen and highlight only programmatically exposed accessible objects/text.

## Options / Props

| Tool | Description |
|------|-------------|
| **Accessibility Insights for Windows** | Recommended primary tool. `Live Inspect` verifies UI Automation properties by hovering/focusing an element; `FastPass` finds common high-impact issues in under 5 minutes; `Troubleshooting` diagnoses specific issues. |
| **Accessibility Insights for Web** | Chrome/Edge extension counterpart for web content (`FastPass`, `Assessment`). Includes an Inspect/AccEvent-equivalent view of UIA elements, properties, patterns, and events. |
| **Inspect.exe** | Windows SDK legacy tool. Select any UI element to view its UI Automation properties, control patterns, and tree navigation structure — useful for confirming attributes set via `AutomationProperties` or coming from default control peer support. |
| **AccEvent.exe** (Accessible Event Watcher) | Windows SDK legacy tool. Tests whether UI elements fire proper UI Automation / MSAA events on focus change, invocation, selection, or property/state change. Used to debug custom/extended control event firing. |
| **AccScope** | Windows SDK tool for visual evaluation of accessibility during early design; shows the UI Automation tree as a list or visual overlay, Narrator-focused. |
| **UI Accessibility Checker (AccChecker)** | Runtime static checks for UI Automation, MSAA, and ARIA issues (missing names, tree issues, etc.); has UI and command-line modes (`acccheckui.exe`). |
| **UI Automation Verify (UIA Verify)** | Framework for manual/automated UIA-implementation testing with loggable results; useful for regression testing established features. |

## Notes

- Applies to WinUI 3 / Windows App SDK apps and the general UI Automation testing toolchain (`Accessibility Insights`, Windows SDK legacy tools). Not to be confused with unrelated testing tools sharing generic names in other stacks (e.g. Playwright, Vitest).
- Prefer Accessibility Insights over the legacy SDK tools (Inspect, AccEvent, AccChecker, UIA Verify) for day-to-day work; legacy tools remain useful for deep UI Automation property/pattern/event inspection.
- Build accessibility testing as a release gate: automated checks in PRs/CI that can fail builds on critical regressions, plus scheduled manual screen-reader/keyboard validation, retested whenever templates or navigation logic change.
- Narrator touch-mode testing uses single-finger swipes (equivalent to `Caps Lock+Arrow`), three-finger swipes (equivalent to `Tab`/`Shift+Tab`), single-finger drag for spatial exploration, and a three-finger swipe up to read the whole window (equivalent to `Caps Lock+W`).
- Also validate: tab sequence completeness without pointer input, text contrast ratio (see accessible-text-requirements), correct rendering under all four contrast themes, and UI scaling across DPI/display-setting changes.

## Related

- [Accessible text requirements](./accessible-text-requirements.md)
- [Contrast themes](./high-contrast-themes.md)
- [Accessibility checklist](./accessibility-checklist.md)
- [AutomationProperties (attached properties)](./automation-properties.md)
