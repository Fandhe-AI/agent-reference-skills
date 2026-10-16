# .NET Upgrade Assistant (.NET Framework -> .NET 8+)

.NET Upgrade Assistant analyzes and upgrades .NET Framework (and older .NET) projects — including WPF and Windows Forms — to a current .NET version, converting the project format, retargeting the TFM, and migrating package references.

## Signature / Usage

```bash
# Install as a global CLI tool
dotnet tool install -g upgrade-assistant

# Run against a solution or project
upgrade-assistant upgrade MySolution.sln
```

## Options / Props

| Option | Description |
|--------|-------------|
| In-place project upgrade | Upgrades the project without making a copy |
| Side-by-side project upgrade | Copies the project and upgrades the copy, leaving the original .NET Framework project intact |
| Supported project types | ASP.NET, Azure Functions, WPF, Windows Forms, class libraries, console apps, Xamarin.Forms, .NET MAUI, .NET Native UWP |
| Upgrade paths | .NET Framework → .NET, .NET Core → .NET, previous .NET → latest .NET, UWP → WinUI 3 |
| Status icons | green check (nothing to upgrade / success), yellow warning (upgraded, review needed), red X (upgrade failed) |

## Notes

- **.NET Upgrade Assistant is officially deprecated.** Microsoft recommends the GitHub Copilot modernization chat agent (built into Visual Studio 2026 / VS 2022 17.14.16+) instead, which analyzes projects/dependencies and produces a step-by-step migration plan with automated, reviewable code fixes.
- The Upgrade Assistant page itself still says "GitHub Copilot modernization chat agent", while the Windows docs (migration decision guide, "Modernize or port a Windows app with GitHub Copilot") call the successor "GitHub Copilot upgrade" and point to `/dotnet/core/porting/github-copilot-upgrade/overview` (the canonical URL of the older `/dotnet/core/porting/github-copilot-app-modernization/overview`). GitHub Copilot upgrade supports upgrading C# and Visual Basic projects, including WPF, Windows Forms, and WinUI. Per the decision guide, the Copilot upgrade workflow doesn't fully support Visual Basic projects; follow the manual WPF / Windows Forms upgrade guidance for those.
- Upgrade Assistant does not fully automate WPF/WinForms migrations — always **test thoroughly** after an upgrade; some artifacts require manual follow-up (marked with a yellow warning in the results).
- This tool retargets the TFM and project format; it is a separate step from adding the Windows App SDK (`windows-app-sdk-existing-project.md`) or migrating the UI framework to WinUI 3 (`wpf-vs-winui3.md`) — those require additional, separate work after (or instead of) the .NET version upgrade.

## Related

- [windows-app-sdk-existing-project.md](./windows-app-sdk-existing-project.md)
- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
