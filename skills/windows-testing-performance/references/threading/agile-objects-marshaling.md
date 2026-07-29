# Agile objects and cross-apartment marshaling

The CLR treats a Windows Runtime object as *agile* — callable from any thread without special handling — if it implements `IAgileObject` or carries `MarshalingBehaviorAttribute(MarshalingType.Agile)`. Otherwise the CLR marshals the call to the object's owning apartment when possible; if the object instead carries `MarshalingBehaviorAttribute(MarshalingType.None)`, no marshaling information is available and the CLR throws `InvalidCastException`.

## Signature / Usage

```csharp
// Most WinRT classes are agile, but agile members can still be affinitized
// to the UI thread (e.g. XAML controls) and throw if called elsewhere.
private async void Button_Click(object sender, RoutedEventArgs e)
{
    Button b = (Button)sender;
    await Task.Run(() => {
        b.Content += "."; // throws: must run on the UI thread
    });
}

// Fix: dispatch back to the UI thread via the control's Dispatcher.
private async void Button_Click_Fixed(object sender, RoutedEventArgs e)
{
    Button b = (Button)sender;
    await b.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => {
        b.Content += ".";
    });
}
```

```csharp
// CameraCaptureUI has MarshalingBehaviorAttribute(None) and ThreadingAttribute(STA):
// created on the UI thread, it cannot be marshaled to a background thread at all.
Windows.Media.Capture.CameraCaptureUI ccui;

private async void Button_Click_Capture(object sender, RoutedEventArgs e)
{
    ccui = new Windows.Media.Capture.CameraCaptureUI();
    await Task.Run(() => {
        ccui.PhotoSettings.AllowCropping = true; // throws System.InvalidCastException
    });
}
```

## Options / Props

| API / attribute | Description |
|------|-------------|
| `IAgileObject` | Marker interface (from `objidl.h`); an object implementing it is treated by the CLR as agile regardless of `MarshalingBehaviorAttribute`. |
| `MarshalingBehaviorAttribute(MarshalingType.Agile)` | Documented on WinRT classes the CLR can call from any thread without marshaling; listed in a type's official docs as `MarshalingBehaviorAttribute(Agile)`. |
| `MarshalingBehaviorAttribute(MarshalingType.None)` | Documented on WinRT classes that provide no marshaling information; a call from any thread other than the one that created the object throws `InvalidCastException`. Listed as `MarshalingBehaviorAttribute(None)`. |
| `ICustomQueryInterface` | Interface a C#/VB Windows Runtime component author can implement, alongside `IAgileObject`, to override the default agile behavior for authored types. |
| `InvalidCastException` | Thrown by the CLR when it must marshal a call to a non-agile, non-marshalable (`MarshalingType.None`) object from the wrong thread. |

## Notes

- Agility does not imply thread safety — most agile classes still aren't safe for concurrent access; synchronize individual objects or use thread-safe types only where actually needed.
- Agile classes can still have UI-affinitized members: XAML controls (`DependencyObject`-derived) are agile but throw when a member is touched off the UI thread — use the object's `Dispatcher`/`DispatcherQueue` to marshal the call (see UI thread updates).
- A class implementing `IAgileObject` is treated as agile even without `MarshalingBehaviorAttribute`; a WinRT component author can also implement `ICustomQueryInterface` to opt out of the default agile behavior for authored C#/VB types.
- Distinct from C++/WinRT's `IAgileObject`/`winrt::agile_ref` coverage in the windows-interop-modernize skill (`cppwinrt/agile-objects.md`), which documents the same marker interface from a C++ producer's perspective (`winrt::implements`, `winrt::make_agile`); this page covers the CLR-consumer side (`MarshalingBehaviorAttribute`, `InvalidCastException`) relevant to C#/VB UWP and WinUI 3 apps.

## Related

- [Apartment model (STA / MTA) and WinUI 3](./apartment-model.md)
- [Updating the UI from outside the UI thread](./ui-thread-updates.md)
- [Thread pool](./thread-pool.md)
