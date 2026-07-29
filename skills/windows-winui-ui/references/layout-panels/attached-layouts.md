# Attached Layouts

An attached layout is an object that a host container delegates its measure/arrange logic to, instead of the container implementing layout itself. WinUI 3 ships three ready-to-use attached layouts — `StackLayout`, `UniformGridLayout`, `FlowLayout` — and hosts them primarily through `ItemsRepeater.Layout`.

## Signature / Usage

```xaml
<!-- xmlns:muxc="using:Microsoft.UI.Xaml.Controls" -->
<ScrollViewer>
    <muxc:ItemsRepeater ItemsSource="{x:Bind Items}">
        <muxc:ItemsRepeater.Layout>
            <muxc:UniformGridLayout MinItemWidth="200" MinItemHeight="150"
                                     MinColumnSpacing="8" MinRowSpacing="8"/>
        </muxc:ItemsRepeater.Layout>
    </muxc:ItemsRepeater>
</ScrollViewer>
```

## Options / Props

| Layout | Key properties | Notes |
|--------|-----------------|-------|
| `StackLayout` | `Orientation`, `Spacing` | Single line, horizontal or vertical; the default layout when none is set. |
| `UniformGridLayout` | `Orientation`, `MinItemWidth`/`MinItemHeight`, `MinColumnSpacing`/`MinRowSpacing`, `ItemsStretch`, `ItemsJustification` | Every item sized equally; compatible with data virtualization since size doesn't depend on content. |
| `FlowLayout` | `Orientation`, `LineSpacing`, `MinItemSpacing`, `LineAlignment` | Wraps items onto multiple lines/columns like a wrap panel, sized from each item's own measured size. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Base class hierarchy: `Layout` → `VirtualizingLayout` / `NonVirtualizingLayout`; all three built-in layouts derive from `VirtualizingLayout`.
- `FlowLayout` is marked `[Experimental]` in the Windows App SDK API surface — confirm it has shipped in the SDK channel you target before depending on it.
- The attached-layout *concept* also applies to `LayoutPanel` (a `Panel`-derived container that takes a `Layout` the same way `ItemsRepeater` does), but `LayoutPanel` is Preview and ships only in prerelease drops of the WinUI 3 package; `ItemsRepeater` is the stable host for these layouts today.
- A single layout instance can be shared across multiple containers, so a layout must not cache per-container state directly — state goes through the `LayoutContext`/`LayoutState` mechanism instead.
- Authoring a custom attached layout means deriving from `VirtualizingLayout` or `NonVirtualizingLayout` and overriding `MeasureOverride`/`ArrangeOverride` against a `LayoutContext` — the same measure/arrange contract described for custom panels, but operating on a context object instead of a `Children` collection directly.
- `FlowLayout` shares its name with `UICollectionViewFlowLayout` in UIKit (see the apple-uikit skill) — unrelated APIs beyond the "wrapping flow" concept. ItemsRepeater itself, including its default `StackLayout`/`UniformGridLayout` usage, is documented in the windows-winui-controls skill.

## Related

- [Panel](./panel.md)
- [Choosing a Layout Panel](./choosing-a-layout-panel.md)
- [Custom Panel Authoring](./custom-panels.md)
