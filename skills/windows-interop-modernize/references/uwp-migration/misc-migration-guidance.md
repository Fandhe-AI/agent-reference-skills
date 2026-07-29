# Additional migration guidance

Miscellaneous migration tips that don't belong to a single feature area: conditional compilation for shared UWP/Windows App SDK source files, debugging missing XAML resource keys, event revoker alternatives, an `HttpClient` namespace collision on .NET 10+, and misleading `dotnet run` exit codes.

## Signature / Usage

```csharp
// C#: share a source file between a UWP and a Windows App SDK project
#if !WINDOWS_UWP
    // Win32/Desktop code, including Windows App SDK code
#else
    // UWP code
#endif
```

```cppwinrt
// C++/WinRT: same idea via WINAPI_FAMILY
#if (WINAPI_FAMILY == WINAPI_FAMILY_DESKTOP_APP)
    // Win32/Desktop code, including Windows App SDK code
#else
    // UWP code
#endif
```

```xaml
<!-- XAML: condition: pseudo-namespace, mc:Ignorable -->
<Application xmlns:nouwp="condition:!WINDOWS_UWP" mc:Ignorable="nouwp">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <!--Not needed for UWP-->
                <nouwp:XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls" />
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Application.Resources>
</Application>
```

```csharp
// Windows.Web.Http.HttpClient vs System.Net.Http.HttpClient — ambiguous on .NET 10+
using Windows.Web.Http;
using System.Net.Http;
var client = new HttpClient(); // CS0104: ambiguous reference

// Fix: fully qualify, or prefer System.Net.Http.HttpClient for portability
var client = new System.Net.Http.HttpClient();
```

## Notes

- **Conditional compilation**: `WINDOWS_UWP` (C#) and `WINAPI_FAMILY_DESKTOP_APP` (C++/WinRT, via `winapifamily.h`) gate code shared between a UWP and a Windows App SDK project targeting the same source files. `WINAPI_FAMILY_APP` is deprecated in favor of `WINAPI_FAMILY_DESKTOP_APP` / `WINAPI_FAMILY_PC_APP`.
- **Debugging missing resource keys**: a XAML markup reference to an undefined resource key causes a runtime crash that's hard to diagnose from the exception alone — run under the debugger and check the **Output** pane, which prints a message identifying the missing key.
- **Unregistering event handlers (C++/WinRT)**: besides manually revoking with the token returned from registration, an auto-revoke event revoker is available as an alternative when manual revoke causes lifetime issues — see events and delegates in the cppwinrt category of this skill.
- **`Windows.Web.Http.HttpClient` ambiguity**: on .NET 10+, having both `Windows.Web.Http` and `System.Net.Http` in scope makes `HttpClient` an ambiguous reference (`CS0104`). Fully qualify the type or add a `using` alias; prefer `System.Net.Http.HttpClient` unless a WinRT-specific HTTP feature is required, since it has better .NET integration and no Windows-specific dependency.
- **Misleading `dotnet run` exit codes**: `dotnet run` launches the app in a child process and reports *that* process's raw termination status as its own exit code, which can surface as a large error-looking value such as `3221225786` (`0xC000013A`, `STATUS_CONTROL_C_EXIT`) even when the app didn't crash. Confirm by running the built `.exe` directly, or attaching a debugger with `dotnet run --no-build`.

## Related

- [Migration overview](./migration-overview.md)
- Events and delegates (auto-revoke event revoker) — see the cppwinrt category's events-delegates page in this skill
