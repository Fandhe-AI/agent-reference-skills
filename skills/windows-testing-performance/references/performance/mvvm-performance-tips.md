# MVVM performance tips for WinUI apps

Performance considerations for the MVVM pattern in WinUI apps: binding overhead, `ICommand` allocations, and over-collapsed view trees.

## Signature / Usage

```xaml
<!-- Prefer compiled {x:Bind} over {Binding} -->
<TextBlock Text="{x:Bind ViewModel.Title}" />
```

## Options / Props

| Practice | Recommendation |
|----------|-----------------|
| `{Binding}` vs `{x:Bind}` | `{Binding}` allocates per binding and can trigger reflection/boxing on update; `{x:Bind}` compiles bindings at build time — use `{x:Bind}` |
| `ICommand` (DelegateCommand/RelayCommand) | Adds allocations (including `CanExecuteChanged` listener) and startup/navigation cost; consider code-behind event handlers calling into the view-model instead |
| Building all UI states up front + `Visibility` binding | Adds unnecessary startup time and working set; use `x:Load` to defer unused subtrees, or separate `UserControl`s per mode |

## Notes

- Applies to WinUI's MVVM usage specifically (`{x:Bind}` is a WinUI/UWP XAML compiler feature); third-party MVVM frameworks layered on top inherit the same binding-engine tradeoffs.

## Related

- [Optimize XAML loading](./optimize-xaml-loading.md)
- [Best practices for startup performance](./app-startup-performance.md)
