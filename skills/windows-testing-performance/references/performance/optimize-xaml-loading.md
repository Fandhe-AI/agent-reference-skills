# Optimize XAML loading

Reducing XAML parse/load time and memory: deferred loading with `x:Load`, resource-dictionary scoping, and minimizing overdraw.

## Signature / Usage

```xaml
<!-- Most efficient: element is neither created in the visual tree nor loaded into memory until needed -->
<ListView x:Name="List1" Visibility="Collapsed" x:Load="False" />
```

```csharp
// Trigger deferred loading of an x:Load="False" element:
this.FindName("List1");
```

## Options / Props

| Technique | Effect |
|-----------|--------|
| `x:Load="False"` (vs. `Visibility="Collapsed"`) | `Visibility="Collapsed"` still instantiates the object and its children in memory; `x:Load="False"` skips instantiation entirely (small ~600 byte overhead per deferred element when unloaded) until `FindName` is called |
| Panel `Background` instead of a `Rectangle` in front of a panel | Avoids an extra element for simple fills |
| `x:Key` instead of `x:Name` in a `ResourceDictionary` | `x:Name` forces immediate instantiation (field access requirement); `x:Key` benefits from lazy instantiation |
| Move a `UserControl`'s `ResourceDictionary` to page level | A `ResourceDictionary` inside a `UserControl` is duplicated per instance |
| Keep page-specific resources out of `App.xaml` | `App.xaml` resources are parsed at app startup; put single-page resources in that page's local `Page.Resources` |
| Consolidate duplicate brushes into one keyed resource | Avoids XAML creating separate cached instances for visually-identical brushes (especially `GradientBrush`) |
| `CacheMode="BitmapCache"` | Rasterizes overlapping/composite shapes to a bitmap once instead of overdrawing every frame — do not use if the sub-shapes animate |
| `DebugSettings.IsOverdrawHeatMapEnabled` | Visual diagnostic to find unexpected overdrawn regions |

## Notes

- Minimize element count at startup, especially inside data templates (each element is created once per data item — see `optimize-gridview-and-listview.md`).
- Referencing even a single resource from a merged `ResourceDictionary` file causes the whole file to be parsed at startup.
- Windows App SDK compiles XAML to a binary representation at build time (avoiding text-parsing at runtime); keep normal XAML compilation enabled to benefit from this.
- `x:Load` is the Windows App SDK-recommended deferred-loading pattern; `x:DeferLoadStrategy` is a related, lower-level attribute for the same purpose.

## Related

- [Optimize your XAML layout](./optimize-xaml-layout.md)
- [Best practices for startup performance](./app-startup-performance.md)
- [MVVM performance tips](./mvvm-performance-tips.md)
