# XamlOptionalChanges / XamlChangeId (Microsoft.UI.Xaml.Settings)

Static class that lets an app opt into or out of optional breaking changes before XAML initialization. These changes may improve performance or fix behavior, but could break compatibility with existing code.

## Signature / Usage

```csharp
[Windows.Foundation.Metadata.ContractVersion(typeof(Microsoft.UI.Xaml.WinUIContract), 720896)]
[Windows.Foundation.Metadata.MarshalingBehavior(Windows.Foundation.Metadata.MarshalingType.Agile)]
[Windows.Foundation.Metadata.Threading(Windows.Foundation.Metadata.ThreadingModel.Both)]
public sealed class XamlOptionalChanges

public static bool EnableChange(XamlChangeId changeId);
public static bool DisableChange(XamlChangeId changeId);
public static bool IsChangeEnabled(XamlChangeId changeId);
public static bool IsLocked();
public static bool Lock();
```

```cpp
// C++/WinRT
static bool EnableChange(XamlChangeId const& changeId);
static bool DisableChange(XamlChangeId const& changeId);
static bool IsChangeEnabled(XamlChangeId const& changeId);
static bool IsLocked();
static bool Lock();
```

## Options / Props

Methods (all static, namespace `Microsoft.UI.Xaml.Settings`):

| Name | Returns | Description |
|------|---------|-------------|
| EnableChange(XamlChangeId changeId) | bool | Enables the specified optional XAML behavior change. `true` if successfully enabled; `false` if changes have been locked. |
| DisableChange(XamlChangeId changeId) | bool | Disables the specified optional XAML behavior change. Returns `false` if changes have been locked. |
| IsChangeEnabled(XamlChangeId changeId) | bool | Returns whether the specified optional XAML behavior change is currently enabled. |
| IsLocked() | bool | Returns whether optional XAML changes have been locked and can no longer be modified. |
| Lock() | bool | Locks optional XAML changes so that no further changes can be enabled or disabled. `true` if successfully locked. |

`XamlChangeId` enum values:

| Name | Value | Opts in to (Windows App SDK 2.3.1 release notes) |
|------|-------|-------------|
| _Reserved | 0 | Reserved |
| DefaultStyleOptimizations | 60995620 | New optimized `XamlControlsResources` styles, including an optimized `ScrollBar` template |
| DeferContextFlyoutInit | 61098986 | Avoids unnecessary default `ContextFlyout` initialization on `TextBlock` and `RichTextBlock` when entering or leaving the element tree |
| IconNoGridOptimization | 61276805 | `FontIcon` and `BitmapIcon` avoid inserting an extra `Grid` in their visual tree |
| OptimizeApplyStyles | 61697456 | Stops loading `Style` property setters that don't apply a value; delays applying `FrameworkElement` and `Control` styles until the element is in the tree |

## Notes

- All methods must be called before XAML is initialized (before `Application.Start`). Once `Lock()` is called or XAML initializes, no further changes can be made (XAML initialization locks automatically); `EnableChange` / `DisableChange` then return `false`.
- Added in Windows App SDK 2.3.1 (released July 16, 2026; RuntimeCompatibilityChange `XamlSettings_OptionalChangesApi`). The API reference page still carries the prerelease notice, but the 2.3.1 release notes list it as shipped.
- Several 2.3.1 performance optimizations are opt-in via these `XamlChangeId` values; others in the same release need no opt-in.
- `DISABLE_XAML_GENERATED_MAIN` (2.3.1): when defined, the generated `main()` is now renamed instead of removed, so a custom `main()` can call the default implementation. C#: `XamlGeneratedProgram.XamlGeneratedMain()`; C++/WinRT: `wXamlGeneratedMain()`. A custom entry point is where `XamlOptionalChanges` is called before `Application.Start`.
- `DISABLE_XAML_GENERATED_MAIN` (2.4.0): fixed the access modifier on the generated C# entry point helper when the constant is defined (GitHub issue microsoft-ui-xaml#11245).
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.settings.xamloptionalchanges (view `windows-app-sdk-2.0`).

## Related

- [XAML overview](./xaml-overview.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
