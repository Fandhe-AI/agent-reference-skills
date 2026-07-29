# Secondary tile pinning

Design guidance for letting users pin a specific area of an app (a city's weather, a contact, a playlist) as its own tile on the Start menu, separate from the app's primary tile. Only the user can pin or unpin a tile — apps can never do so programmatically.

## Signature / Usage

Put the pin action on the app bar for whatever content is currently in focus:

```xaml
<!-- Content is pinnable and not yet pinned -->
<AppBarButton Icon="Pin" Label="Pin to Start" Click="PinToStart_Click"/>

<!-- Content is already pinned: swap to the unpin affordance -->
<AppBarButton Icon="UnPin" Label="Unpin from Start" Click="UnpinFromStart_Click"/>
```

## Options / Props

| Content state | App bar button |
| --- | --- |
| Pinnable, not pinned | Show "Pin to Start", using the system pin glyph |
| Already pinned | Replace with "Unpin from Start", using the system unpin glyph |
| Not pinnable | Hide the button, or show it disabled |

| Guideline | Detail |
| --- | --- |
| Good candidate | Frequently changing content a user wants to monitor and jump back into (a specific city's weather, a contact's updates, an RSS feed, a playlist) |
| Bad candidate | Using a tile as a virtual command button (e.g. a "skip to next track" tile) — tiles are entry points, not remote controls |
| Confirmation | Call the pin API immediately from the UI thread on click; Windows itself shows the confirmation dialog, the app doesn't need to build one |
| IDs | Use meaningful, re-creatable, unique tile IDs so the app can recognize its own tiles after reinstall or roaming |

## Notes

- Live Tiles/secondary tiles are a legacy Windows 10 pattern not supported on later Windows versions; for new apps, follow current app-icon guidance instead.
- Desktop apps (WinUI 3, WPF, WinForms) can also pin secondary tiles, but must be MSIX-packaged and must initialize the tile object with the owner window's HWND before calling any UI-showing API — see the `SecondaryTile` API reference in windows-platform-integration for the implementation details and code.
- `AppBarButton` referenced here is a `Microsoft.UI.Xaml.Controls` (WinUI 3) type, distinct from `System.Windows.Controls` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` APIs.

## Related

- [Usability overview](./usability-overview.md)
