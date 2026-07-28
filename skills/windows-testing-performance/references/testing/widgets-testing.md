# Testing Windows Widgets

Widget providers (`Microsoft.Windows.Widgets.Providers.IWidgetProvider`) are tested by deploying the packaged provider app and pinning its widgets in the **Widgets Board** — the only supported widget host in the current release.

## Signature / Usage

```text
1. Select the architecture matching your dev machine (e.g. x64) in Solution Platforms.
2. Solution Explorer > right-click solution > Build Solution.
3. Right-click the packaging project (e.g. *Package) > Deploy.
4. Open the Widgets Board > Add widgets.
5. Scroll to your app's widgets and click to pin them, then exercise their functionality.
```

## Options / Props

| Name | Description |
|------|-------------|
| **Attach to process** | Debug > Attach to process, filter to the widget provider app, attach the debugger to the already-running provider |
| **Debug Installed App Package** | Debug > Other Debug Targets > Debug Installed App Package; check "Do not launch, but debug my code when it starts" to auto-attach on next launch |

## Notes

- Only **packaged** apps can be registered as widget providers; the provider must be deployed via its MSIX packaging project before it appears in the Widgets Board's "Add widgets" list.
- After pinning, the Widget Platform starts the widget provider process on demand to service the widget — use either manual attach or the auto-attach debug target to debug it.
- This applies to `Microsoft.Windows.Widgets.Providers.*` (Windows App SDK widget providers), not `androidx.glance` widgets or other platforms' widget systems.
- Applicable to both C++/WinRT and C# widget provider implementations; the testing/deployment steps are the same regardless of language.

## Related

- [App Actions Testing Playground](./app-actions-testing.md)
