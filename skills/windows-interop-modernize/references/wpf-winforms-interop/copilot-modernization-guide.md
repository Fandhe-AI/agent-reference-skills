# Modernizing a WPF or WinForms App with GitHub Copilot

GitHub Copilot (with the WinUI 3 development plugin and the Microsoft Learn MCP Server) helps decide and execute a modernization path for an existing WPF or WinForms app: upgrade in place, add Windows App SDK features, or rebuild with WinUI 3.

## Signature / Usage

```text
"I have a WPF app targeting .NET 8. Show me how to add Windows push
notifications using the Windows App SDK. The app is not currently packaged."

"My WPF app looks dated. Make it look modern with a dark mode option
and a navigation sidebar like modern Windows apps use."

"Replace my WPF OpenFileDialog usage with the Windows App SDK
StorageFilePicker for a better modern Windows experience."
```

## Options / Props

**Should I upgrade in place or rebuild with WinUI 3?**

| Your situation | Recommended path |
| --- | --- |
| Keep WPF or WinForms as the UI framework, move to .NET 9+ | **Upgrade in place** — use the GitHub Copilot modernization for .NET agent to automate project file and code changes |
| Add modern Windows features (notifications, AI, shell integration) without changing the UI framework | **Add Windows App SDK features** — integrate specific features via Copilot + Learn MCP Server |
| Need modern Fluent UI, touch support, WinRT depth, or a fresh codebase | **Rebuild with WinUI 3** — see `wpf-vs-winui3.md` for API mapping |
| LOB app with WCF, COM, or heavy third-party UI controls | **Upgrade in place first**, then modernize incrementally — the GitHub Copilot modernization for .NET agent can assist with WCF -> CoreWCF, EF, and ASP.NET Core upgrades |

## Notes

- "Upgrade" (moving to a newer .NET version on the same UI framework) and "rebuild" (moving to WinUI 3) are separate decisions — an app can upgrade now and rebuild later, or do both together for a greenfield replacement.
- The GitHub Copilot modernization for .NET agent (`/dotnet/core/porting/github-copilot-app-modernization/overview`) covers the upgrade-in-place path; adding Windows App SDK features to the existing app is a separate, independent effort covered by scenario prompts (push notifications, dark mode/navigation sidebar, file picker, background-task notifications).
- Basic app notifications work in both packaged and unpackaged WPF/WinForms apps with no package identity required; push notifications received while the app isn't running (the common production scenario) require COM activation and background delivery, which need package identity.
- Prerequisite setup (GitHub Copilot, the WinUI 3 development plugin, and the Microsoft Learn MCP Server) is shared with the UWP-to-WinUI-3 migration workflow; it is not specific to WPF/WinForms.
- This page covers only the WPF/WinForms-specific guidance from the source article; its Electron/Flutter/React Native and winapp CLI cross-platform packaging material is out of scope for this skill.

## Related

- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
- [windows-app-sdk-existing-project.md](./windows-app-sdk-existing-project.md)
- [dotnet-upgrade-assistant.md](./dotnet-upgrade-assistant.md)
