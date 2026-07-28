# Accessibility overview

Introduces the concepts and technologies for building accessible Windows apps: keyboard support, screen readers, high-contrast settings, and alternative/supplemental UI.

## Signature / Usage

Accessible Windows apps support people with disabilities (temporary and permanent) as well as people with personal preferences, work styles, or situational constraints (shared work spaces, low bandwidth, bright sunlight, noisy surroundings, and so on).

XAML controls provide built-in support for keyboard access and assistive technologies such as screen readers, primarily through integration with the Microsoft UI Automation framework. Each control class uses automation peers and automation patterns to report its role and content to UI Automation clients.

```xaml
<!--Don't do this: pointer-only interaction on a non-focusable element.-->
<Image Source="sample.jpg" PointerPressed="Image_PointerPressed"/>

<!--Do this instead: compose with a focusable, keyboard-activatable control.-->
<Button Click="Button_Click" AutomationProperties.Name="Open profile photo">
  <Image Source="Assets/profile-photo.png"/>
</Button>
```

## Notes

- Accessibility support is provided through **Microsoft UI Automation**; custom XAML controls should implement an automation peer (see Custom automation peers) for equivalent behavior.
- **UI Automation**, **Button**, **Image**, and **ListView**/**GridView** referenced here are `Microsoft.UI.Xaml.Controls` (WinUI 3) types, distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.
- Treat accessibility verification as an ongoing engineering activity (automated checks per build plus targeted manual assistive-technology validation), not a final QA pass.
- Assistive technology examples: On-Screen Keyboard, voice-recognition software, screen readers (including the built-in Narrator with touch mode), and display-adjustment tools such as high-contrast themes, DPI scaling, and Magnifier.
- The most important information a screen reader needs for each element is an **accessible name** — see [Accessible text requirements](./accessible-text-requirements.md).
- Microsoft DirectX content hosted via `SwapChainPanel` or `SurfaceImageSource` is not accessible by default; an `AutomationPeer` must be created for the hosted content to expose it to UI Automation.

## Related

- [Designing inclusive software](./designing-inclusive-software.md)
- [Keyboard accessibility](./keyboard-accessibility.md)
- [Contrast themes](./high-contrast-themes.md)
- [Accessible text requirements](./accessible-text-requirements.md)
