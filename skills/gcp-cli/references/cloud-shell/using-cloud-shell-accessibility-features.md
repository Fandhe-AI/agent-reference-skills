---
source: https://docs.cloud.google.com/shell/docs/using-cloud-shell-accessibility-features
---

# Use accessibility features of Cloud Shell

Cloud Shell keyboard navigation, terminal accessibility features, themes and font sizes, and recommended browsers and screen readers.

## Signature / Usage

### Keyboard navigation in Cloud Shell

- If you use JAWS, press `Insert+z` to toggle the virtual cursor on and off.
- To navigate to the next focusable element on the page, press `Tab`.

### Cloud Shell Terminal accessibility features

- To scroll up when using the terminal, press `Shift+PageUp`; to scroll down, press `Shift+PageDown`.
- In the terminal, Cloud Shell captures Tab key presses. To switch to navigation with the Tab key, press `Control+M`. To capture Tab key presses again, press `Control+M` in the terminal.
- Cloud Shell uses an input element to capture key presses; screen readers normally announce the empty contents of this input. To read the current terminal row to screen readers, press `Control+,`.

### Customize color themes and font sizes

- To change your Cloud Shell Editor theme, see [themes.md](./themes.md).
- To change Cloud Shell Terminal settings, go to **Settings** > **Terminal Preferences**: **Text Size** (Smallest, Small, Medium, Large, Largest), **Font**, and **Color Themes**.

### Gcloud screen reader output

For screen reader features in the Google Cloud CLI itself, see "Enabling accessibility features" in the gcloud CLI docs. Snippet taken from https://docs.cloud.google.com/shell/docs/quotas-limits (Cloud Shell enables gcloud accessibility features by default, which renders table output as a flattened list; this restores boxed tables):

```bash
gcloud config set accessibility/screen_reader false
```

### Recommended browsers and screen readers

| Operating system | Screen reader | Browser |
| --- | --- | --- |
| Microsoft Windows | NVDA or JAWS | Mozilla Firefox Chrome Browser |
| macOS | VoiceOver | Chrome Browser |
| Chrome OS | ChromeVox | Chrome Browser |
| iOS | VoiceOver | N/A (mobile app) |
| Android | TalkBack | N/A (mobile app) |

## Notes

- Distance line: gcloud CLI accessibility is covered by the `install-setup` category (enabling-accessibility-features) of this skill.
- Source: https://docs.cloud.google.com/shell/docs/using-cloud-shell-accessibility-features (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [themes.md](./themes.md)
- [use-cloud-shell-terminal.md](./use-cloud-shell-terminal.md)
- [quotas-limits.md](./quotas-limits.md)
