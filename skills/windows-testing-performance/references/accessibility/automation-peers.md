# Custom automation peers

An **AutomationPeer** is the provider-side object a control exposes to UI Automation. Built-in XAML controls already have peers; when you author a custom control (or derive from a non-sealed built-in control with new behavior), you extend or implement a peer so accessibility tools and automated test clients can inspect and interact with it correctly.

## Signature / Usage

```csharp
using Microsoft.UI.Xaml.Automation.Peers;

public class NumericUpDown : RangeBase
{
    protected override AutomationPeer OnCreateAutomationPeer()
    {
        return new NumericUpDownAutomationPeer(this);
    }
}

public class NumericUpDownAutomationPeer : RangeBaseAutomationPeer
{
    public NumericUpDownAutomationPeer(NumericUpDown owner) : base(owner) { }

    protected override string GetClassNameCore() => "NumericUpDown";

    protected override AutomationControlType GetAutomationControlTypeCore()
        => AutomationControlType.Spinner;

    protected override object GetPatternCore(PatternInterface patternInterface)
    {
        if (patternInterface == PatternInterface.RangeValue)
        {
            return this;
        }
        return base.GetPatternCore(patternInterface);
    }
}
```

## Options / Props

| Member | Description |
|--------|-------------|
| `UIElement.OnCreateAutomationPeer()` | Protected virtual method every `UIElement` subclass has; override to return a new instance of your custom peer. Do nothing else inside this override besides constructing and returning the peer. |
| `FrameworkElementAutomationPeer` | The base peer to derive from for controls based directly on `Control` (which has no dedicated peer class). Provides default `GetBoundingRectangleCore`, `GetClickablePointCore`, `GetNameCore`, `HasKeyboardFocusCore`, `IsEnabledCore`, `IsKeyboardFocusableCore`, `IsOffscreenCore`, `SetFocusCore`, and `GetParent` implementations inferred from layout/behavior state. Prefer deriving from the closest matching peer base (e.g. `RangeBaseAutomationPeer`) over `FrameworkElementAutomationPeer` when one exists. |
| `AutomationPeer.GetClassNameCore()` | Must-implement override; returns the (non-localized) class name reported to clients. |
| `AutomationPeer.GetAutomationControlTypeCore()` | Returns an `AutomationControlType` describing the control's role. Only implement `GetLocalizedControlTypeCore` if you return `AutomationControlType.Custom`. |
| `AutomationPeer.GetPatternCore(PatternInterface)` / `GetPattern` | Declares which control patterns the peer supports. Return `this` (or a sub-element peer) for a supported `PatternInterface`, or fall back to `base.GetPatternCore(...)` / `null` for unsupported ones. See [Control patterns and interfaces](./control-patterns-and-interfaces.md). |
| `AutomationPeer.GetChildrenCore()` | Builds the automation subtree; override to represent custom parent-child relationships instead of the default visual-tree traversal. |
| `AutomationPeer.IsContentElementCore()` / `IsControlElementCore()` | Indicate whether the element should be treated as content, control, or both (both default `true`). Sub-element peers used only for pattern forwarding can return `false` from `IsControlElementCore` to stay out of the exposed tree. |
| `AutomationPeer.GetLabeledByCore()` | Override to report a labeling relationship for class-based label/part scenarios. |
| `AutomationPeer.GetLiveSettingCore()` | Override to return something other than `AutomationLiveSetting.Off` for live-region controls. |
| `AutomationPeer.RaiseAutomationEvent(AutomationEvents)` | Call from control code (via the peer) to notify clients of a state change relevant to accessibility (element action / structure change / global change events). Check `AutomationPeer.ListenerExists(...)` first to avoid unnecessary peer creation. |
| `AutomationPeer.RaisePropertyChangedEvent(...)` | Call when a UI Automation property value changes (e.g. a range's current value), so clients subscribed to property-change events are notified. |

## Notes

- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.Automation.Peers.AutomationPeer` and subclasses). Peer class naming convention: `<ControlName>AutomationPeer` (e.g. `ButtonAutomationPeer`).
- Before writing a custom peer, verify whether the base control's default peer (or `FrameworkElementAutomationPeer`) already provides adequate support — including for your automated accessibility tests, not just manual inspection.
- `GetPatternCore` can forward pattern handling to a sub-element's peer (e.g. `ItemsControl` forwarding `Scroll` to its internal `ScrollViewer`'s peer) via `FrameworkElementAutomationPeer.CreatePeerForElement`.
- Route both pointer/keyboard-triggered behavior and provider-interface methods (e.g. `IExpandCollapseProvider.Expand`) through the same shared control logic so state stays consistent regardless of invocation path.
- Peers may throw `ArgumentNullException` for invalid input; use `ElementNotAvailableException` when the owner/related peer is no longer available, and `ElementNotEnabledException` when the owner exists but is disabled. Be conservative — many UI Automation clients are COM-based and primarily evaluate HRESULTs.
- `AutomationProperties.AccessibilityView="Raw"` (set directly in XAML) is a non-peer-code complement for omitting template parts with no accessibility meaning.

## Related

- [UI Automation overview](./ui-automation-overview.md)
- [Control patterns and interfaces](./control-patterns-and-interfaces.md)
- [AutomationProperties (attached properties)](./automation-properties.md)
- [Keyboard accessibility](./keyboard-accessibility.md)
