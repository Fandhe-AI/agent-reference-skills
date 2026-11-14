# Cross-framework app considerations

What to expect when moving a React Native for Windows, Electron, .NET MAUI, or Flutter app to WinUI 3, and how to brief an AI agent. The key decision is whether to keep a cross-platform shell or build a Windows-first app; give the agent a clear boundary between shared business logic and UI to rewrite as native WinUI 3.

## Signature / Usage

React Native for Windows starter prompt:

```text
I have a React Native for Windows component. Rewrite it as a WinUI 3 UserControl using C# and XAML.
```

Electron starter prompt:

```text
I have an Electron app. Create a WinUI 3 shell that hosts a WebView2, and show me how to call native Windows APIs from the web layer using window.chrome.webview.postMessage.
```

.NET MAUI starter prompt:

```text
I have a .NET MAUI ViewModel and service layer. Reuse them in a WinUI 3 project targeting Windows only. Keep the ViewModel unchanged and update only the View.
```

Flutter starter prompt:

```text
I have a Flutter screen with a list and a detail view. Rewrite it as a WinUI 3 page using NavigationView and a master/detail layout.
```

## Options / Props

| Source framework | Guidance |
| --- | --- |
| React Native for Windows | Uses a WinUI rendering layer under the hood; native controls can be integrated through `<WindowsXamlView>` or NativeModules. For a fully native experience, port to WinUI 3: keep business logic and services, rewrite UI components as XAML and C#. |
| Electron | Web technology in a shell; WinUI 3 is native Win32. Incremental path: host the existing web UI in a WinUI 3 window using WebView2, then migrate features to native controls over time. |
| .NET MAUI | Already targets Windows via WinUI 3. For a Windows-only app, remove MAUI and target WinUI 3 directly. ViewModels and services move across cleanly; MAUI XAML (`Microsoft.Maui.Controls.*`) must be rewritten to WinUI 3 XAML (`Microsoft.UI.Xaml.*`); shared .NET class libraries stay as-is. |
| Flutter | Uses its own rendering engine, not WinUI 3. Platform channels can call native Win32 or WinRT APIs, but a full port replaces Flutter rendering with native XAML. |

## Notes

- Sharing code across platforms: keep business logic in a separate .NET class library (platform-agnostic); share it between WinUI 3, MAUI, Blazor, or any other .NET target; reuse models, services, and ViewModels before rewriting UI; use `#if WINDOWS` conditional compilation only as a last resort.
- MAUI and WinUI 3 both use XAML but different namespaces (`Microsoft.Maui.Controls.*` vs `Microsoft.UI.Xaml.*`); do not mix them. Controls such as `Button` / `Grid` / `StackLayout` differ in name and behavior between the two.
- The Electron prompt and WebView2 `window.chrome.webview.postMessage` messaging are verbatim from the source; when exposing native APIs to web content, validate message origin and payload in the host before acting on them (not stated on the source page).
- The Options / Props table condenses the source's per-framework prose; the starter prompts are verbatim.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ai-assisted/migrate/cross-framework (en-us, fetched 2026-11-14). Source page `ms.date` 2026-05-13.

## Related

- [Migrate an iOS app to WinUI 3](./ios-to-winui.md)
- [Choose your migration path](./migration-decision-guide.md)
