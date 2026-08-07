# Telemetry and Crash Reporting

Collecting telemetry and crash data from production helps understand real-world app performance, identify regressions, and prioritize fixes. Windows App SDK apps commonly use Azure Application Insights, the vendor-neutral OpenTelemetry SDK, or native Windows Error Reporting (WER) dump collection.

## Signature / Usage

```csharp
// OpenTelemetry: create and use an ActivitySource for distributed tracing
var activitySource = new System.Diagnostics.ActivitySource("MyApp");
using var activity = activitySource.StartActivity("Startup");
activity?.SetTag("app.version", "1.0.0");
```

```dotnetcli
dotnet add package OpenTelemetry
dotnet add package Azure.Monitor.OpenTelemetry.Exporter
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Microsoft.ApplicationInsights` | NuGet package | Crash reporting, performance monitoring, and usage analytics; requires an Azure Application Insights resource and connection string |
| `TelemetryClient` | class (Application Insights) | Initialized at app startup with the connection string; used to track exceptions, events, and page views |
| `OpenTelemetry` / `Azure.Monitor.OpenTelemetry.Exporter` | NuGet packages | Vendor-neutral logs/metrics/traces SDK that can export to Azure Monitor or other backends |
| `ActivitySource` / `Activity` | .NET diagnostics types | Emit spans that OpenTelemetry SDKs listen to for distributed tracing |
| `HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting\LocalDumps` | registry key | Configures local user-mode crash dump collection (WER); `DumpFolder`, `DumpCount`, `DumpType`, `CustomDumpFlags` values |

## Notes

- OpenTelemetry is the recommended approach for new projects needing multi-backend support or distributed tracing; Application Insights remains a good choice for Azure-Monitor-only usage with turnkey dashboards.
- For packaged (MSIX) apps, native crash data collected by Windows Error Reporting surfaces through Partner Center quality reports; for organizational (LOB) apps, configure WER local dump collection (`LocalDumps` registry key) to save minidumps for local analysis instead.
- WER local dump collection is disabled by default and requires administrator privileges to enable; settings can be global or overridden per-application under a subkey named after the executable (e.g. `...\LocalDumps\MyApplication.exe`).
- `DumpType`: `0` = custom dump (uses `CustomDumpFlags`), `1` = mini dump (default), `2` = full dump.

## Related

- [Running Windows App Tests in CI](./ci-testing.md)
- [Static Analysis for .NET and C++](./static-analysis-dotnet-cpp.md)
