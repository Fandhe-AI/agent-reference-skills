# x:DeferLoadStrategy attribute

Legacy attribute that delays creation of an element and its children until explicitly realized, reducing startup time at a small per-element memory cost (~600 bytes). Superseded since Windows 10 version 1703 (Creators Update) by `x:Load`.

## Signature / Usage

```xaml
<Grid x:Name="DeferredGrid" x:DeferLoadStrategy="Lazy">
    ...
</Grid>
```

```csharp
this.FindName("DeferredGrid"); // realizes the deferred element
```

## Notes

- `x:DeferLoadStrategy="Lazy"` is equivalent to `x:Load="False"`, except `x:Load` also supports unloading the element again afterward — prefer `x:Load` in new code; this page documents the legacy attribute since the official toc still lists it separately.
- Same restrictions as `x:Load`: requires `x:Name`; only types deriving from `UIElement` or `FlyoutBase`; not usable on root elements of `Page`/`UserControl`/`DataTemplate`, on elements in a `ResourceDictionary`, or in XAML loaded via `XamlReader.Load`.
- Realized the same ways as `x:Load`: `FindName`, `GetTemplateChild`, a `VisualState` `Setter`/`Storyboard` targeting the element, or any `Storyboard` targeting it.
- Nested deferred elements must be realized outermost-first; realizing an inner element before its parent throws.

## Related

- [x:Load attribute](./x-load-attribute.md)
- [x:Name attribute](./x-name-attribute.md)
