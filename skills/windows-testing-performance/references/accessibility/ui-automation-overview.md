# UI Automation overview

Microsoft UI Automation is the accessibility framework that Windows apps use to expose UI structure and content to assistive technologies (screen readers, on-screen keyboards) and to automated test clients. WinUI 3 / Windows App SDK controls implement UI Automation support through **automation peers**.

## Signature / Usage

There are two roles in the UI Automation model:

- **Clients** call UI Automation APIs to discover and interact with UI (for example, a screen reader). Clients navigate a tree of automation elements and can target one app or the whole desktop.
- **Providers** publish accessibility information into that tree by implementing APIs for the controls introduced by an app. When you build a custom control, you participate in the provider model.

Built-in XAML controls already provide UI Automation support through base classes and control-specific **AutomationPeer** subclasses. Each control class reports its role, content, and supported behaviors (patterns) to UI Automation clients through its peer.

```xaml
<!-- Custom XAML components need an automation peer to be accessible;
     see custom-automation-peers.md for implementation details. -->
<Button AutomationProperties.Name="Special"
        AutomationProperties.HelpText="This is a special button." />
```

## Notes

- Applies to WinUI 3 / Windows App SDK apps (`Microsoft.UI.Xaml.Automation.*` namespaces). Legacy UWP uses the equivalent `Windows.UI.Xaml.Automation.*` namespaces; WPF's `System.Windows.Automation` is a distinct, unrelated API surface.
- Accessibility support in Windows apps rests on three pillars: programmatic access (name/role/value via UI Automation), keyboard navigation, and color/contrast.
- For DirectX content hosted in a XAML UI (via `SwapChainPanel` or `SurfaceImageSource`), accessibility is not automatic — you must create an `AutomationPeer` for the hosted content.
- Treat accessibility verification as an ongoing engineering activity (automated checks in CI plus targeted manual assistive-technology testing), not a final QA pass.

## Related

- [Expose basic accessibility information (name, role, value)](./basic-accessibility-information.md)
- [AutomationProperties (attached properties)](./automation-properties.md)
- [Custom automation peers](./automation-peers.md)
- [Control patterns and interfaces](./control-patterns-and-interfaces.md)
- [Keyboard accessibility](./keyboard-accessibility.md)
- [Accessibility testing](./accessibility-testing.md)
