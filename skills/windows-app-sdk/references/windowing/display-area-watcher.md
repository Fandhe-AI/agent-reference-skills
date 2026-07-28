# DisplayAreaWatcher

Enumerates display areas and raises events when the collection of display areas, or the configuration of an individual `DisplayArea`, changes (`Microsoft.UI.Windowing.DisplayAreaWatcher`).

## Signature / Usage

```csharp
using Microsoft.UI.Windowing;

DisplayAreaWatcher watcher = DisplayArea.Primary.CreateWatcher(); // must be created on a UI thread
watcher.Added += (s, displayArea) => { /* new DisplayArea */ };
watcher.Removed += (s, displayArea) => { /* DisplayArea removed */ };
watcher.Updated += (s, displayArea) => { /* configuration changed */ };
watcher.Start();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Status` | `DisplayAreaWatcherStatus` (read-only) | Current status of the watcher. |

**Methods**: `Start()`, `Stop()`.

**Events**: `Added`, `Removed`, `Updated`, `EnumerationCompleted` (initial enumeration pass finished), `Stopped`.

## Notes

- Create via `DisplayArea.CreateWatcher()`, not a public constructor.
- Must be created on a UI thread.
- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [DisplayArea](./display-area.md)
