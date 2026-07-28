# XAML analysis and best practices

Visual Studio's XAML analysis tool ruleset: a checklist of common WinUI performance issues (image decoding, deferred loading, virtualization, bindings, resources, accessibility naming).

## Signature / Usage

```xaml
<!-- Good: BitmapImage attached to the live tree before setting UriSource -->
<Image x:Name="myImage">
    <Image.Source>
        <BitmapImage UriSource="Assets/cool-image.png"/>
    </Image.Source>
</Image>
```

## Options / Props

| Rule | Fix |
|------|-----|
| Decoded image size larger than render size | Use `SetSourceAsync` (not `SetSource`); attach `BitmapImage` to the live tree before setting `UriSource`; set explicit `DecodePixelWidth`/`DecodePixelHeight` for non-rectangular brushes/`NineGrid`/`BitmapIcon` fallback cases |
| Collapsed elements at load time | Use `x:Load` to defer creation instead of only `Visibility="Collapsed"` |
| ListView is not virtualized | Set an explicit width/height on the `ItemsControl`; avoid unbounded parent panels (`ScrollViewer`, auto-sized `Grid`) |
| UI thread blocked or idle during load | Use asynchronous APIs; see `keep-ui-thread-responsive.md` |
| Use `{x:Bind}` instead of `{Binding}` | `{x:Bind}` compiles at build time; `{Binding}` allocates and can trigger reflection/boxing |
| Use `x:Key` instead of `x:Name` in `ResourceDictionary` | `x:Name` forces immediate instantiation |
| Use virtualizing panels for collections | `ItemsWrapGrid`/`ItemsStackPanel`, not `VariableSizedWrapGrid`/`WrapGrid`/`StackPanel` |
| Accessibility: missing UIA names | Set `AutomationProperties.Name`; use `AutomationProperties.AccessibilityView="Raw"` to exclude non-semantic elements from the UIA tree; avoid duplicate Name+ControlType siblings |

## Notes

- This tool surfaces findings inline in Visual Studio, pointing to the relevant diagnostic tool, source location, and documentation for each issue.
- The ruleset overlaps with (and cross-references) the dedicated `optimize-xaml-loading.md`, `optimize-gridview-and-listview.md`, and `keep-ui-thread-responsive.md` guides — this page is the condensed, actionable checklist form.

## Related

- [Optimize XAML loading](./optimize-xaml-loading.md)
- [Optimize ListView and GridView performance](./optimize-gridview-and-listview.md)
- [Keep the UI thread responsive](./keep-ui-thread-responsive.md)
- [Tools for profiling and performance](./profiling-tools.md)
