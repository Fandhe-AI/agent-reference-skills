# Reduce Motion

Windows exposes a system-wide "Show animations in Windows" accessibility setting. Apps should respect the user's animation preference — via `UISettings.AnimationsEnabled` — and provide an alternative, less-animated (or non-animated) experience when the setting is off, both for accessibility and for seizure/vestibular safety.

## Signature / Usage

```csharp
var uiSettings = new Windows.UI.ViewManagement.UISettings();
bool animationsEnabled = uiSettings.AnimationsEnabled;

if (!animationsEnabled)
{
    // Skip or shorten non-essential animations (e.g. disable BitmapImage.AutoPlay,
    // suppress custom Storyboards, use SuppressNavigationTransitionInfo).
}
```

## Options / Props

| Name | Type | Description |
|---|---|---|
| `UISettings.AnimationsEnabled` | `bool` (read-only) | `true` if animations are enabled system-wide; `false` if the user has turned off animations. Query this before playing non-essential animation. |

## Notes

- Namespace: `Windows.UI.ViewManagement` (UWP-era API, still available to WinUI 3 apps). Distinct from the web `prefers-reduced-motion` CSS media query.
- Don't use UI elements that flash more than three times per second — flashing can trigger seizures in users with photosensitive epilepsy.
- Avoid jarring or sudden movements that could trigger a seizure or vestibular discomfort, and keep motion constrained to the element in focus rather than spreading it across unrelated areas of the screen.
- When needed, provide an alternative accessible UI that removes nonessential visuals and animation and simplifies interaction flows (e.g. swap a `UserControl` based on a user setting).
- Respect the OS-level "Turn off all unnecessary animations" (Ease of Access) preference rather than only relying on in-app settings.

## Related

- [Motion Overview](./motion-overview.md)
- [Implicit Animations](./implicit-animations.md)
- [Motion in Practice](./motion-in-practice.md)
