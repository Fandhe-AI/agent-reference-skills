# Custom Panel Authoring

Deriving directly from `Panel` and overriding `MeasureOverride`/`ArrangeOverride` is how you build a custom layout panel. `Panel` itself supplies no layout behavior — every practical panel (`Grid`, `StackPanel`, etc.) implements these overrides natively, and a custom panel does the same in managed/authored code.

## Signature / Usage

```csharp
public class MyPanel : Panel
{
    protected override Size MeasureOverride(Size availableSize)
    {
        Size desired = new Size();
        foreach (UIElement child in Children)
        {
            child.Measure(availableSize);
            // accumulate desired size from child.DesiredSize
        }
        return desired; // never return a Size with an Infinity component
    }

    protected override Size ArrangeOverride(Size finalSize)
    {
        foreach (UIElement child in Children)
        {
            child.Arrange(new Rect(new Point(0, 0), child.DesiredSize));
        }
        return finalSize; // normally identical to the input
    }
}
```

## Options / Props

| Member | Source | Description |
|--------|--------|-------------|
| `Children` | `Panel` | `UIElementCollection` to iterate in both overrides; the XAML content property. |
| `MeasureOverride(Size availableSize)` | `FrameworkElement` | Must call `Measure` on every child; return value becomes the panel's own `DesiredSize`. |
| `ArrangeOverride(Size finalSize)` | `FrameworkElement` | Must call `Arrange` on every child with a `Rect` (position + size); return value is normally `finalSize` unchanged. |
| `UIElement.DesiredSize` | `UIElement` | Set by `Measure`; the value layout logic should read back, not `ActualWidth`/`ActualHeight`. |

## Notes

- Derive directly from `Panel` rather than from a practical subtype like `Grid` or `StackPanel` — it's difficult to work around a subtype's existing layout logic, and it may carry irrelevant properties.
- `MeasureOverride` must not return a `Size` containing `Infinity`, and returning the default `Size(0,0)` without adjustment means the panel requests no space and never renders.
- Avoid reading `ActualWidth`/`ActualHeight` of child elements inside the overrides — basing logic on a layout-calculated property inside the layout pass risks a `LayoutCycleException`; use each child's `DesiredSize` instead.
- The arrange pass can run without a preceding measure pass (e.g. only alignment changed), but any measure-affecting property change re-triggers both passes automatically — never call `InvalidateMeasure`/`InvalidateArrange`/`UpdateLayout` from inside an override.
- Keep interactive functionality (scrolling, selection, focus) out of a custom panel — that belongs in a custom `Control`; a panel should only measure/arrange/decorate its children.
- `MeasureOverride`/`ArrangeOverride` are also the override names on WPF's `System.Windows.FrameworkElement` (see the windows-interop-modernize skill's WPF/WinForms interop pages) — same method names, unrelated base type from this WinUI 3 `Panel`.

## Related

- [Panel](./panel.md)
- [Attached Layouts](./attached-layouts.md)
- [Choosing a Layout Panel](./choosing-a-layout-panel.md)
