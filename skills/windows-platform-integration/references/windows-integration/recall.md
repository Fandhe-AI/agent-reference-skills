# Recall integration (UserActivity relaunch, sensitivity labels, DLP provider)

Recall (Copilot+ PCs) periodically saves local snapshots of the screen so users can semantically search their past activity. Apps integrate with Recall by pushing a `UserActivity` so users can relaunch back into the exact content shown in a snapshot, and by attaching sensitivity-label metadata via `UserActivity.ContentInfo` so enterprise DLP policy can be enforced. DLP vendors integrate separately, by implementing the Recall DLP provider DLL that Recall queries before every capture.

## Signature / Usage

```csharp
// 1) Enable relaunch: push a UserActivity whenever the app's main content changes.
UserActivitySession _previousSession;

private async Task OnContentChangedAsync()
{
    _previousSession?.Dispose();

    string id = "doc135.txt";
    var activity = await UserActivityChannel.GetDefault().GetOrCreateUserActivityAsync(id);
    activity.VisualElements.DisplayText = "doc135.txt";
    activity.ActivationUri = new Uri("my-app://docs/doc135.txt");

    // 2) Attach a sensitivity label so Recall can query the DLP provider before capturing.
    string json = @"{
      ""@context"": ""https://schema.org"",
      ""@type"": ""DocumentObject"",
      ""identifier"": ""doc135.txt"",
      ""informationProtection"": {
        ""@type"": ""SensitivityLabel"",
        ""state"": ""sensitive"",
        ""labels"": [ { ""labelID"": ""F96E0B19-...-247B"", ""organizationID"": ""00aa00aa-...-44ee"" } ]
      }
    }";
    activity.ContentInfo = UserActivityContentInfo.FromJson(json);

    await activity.SaveAsync();
    _previousSession = activity.CreateSession();
}
```

```cpp
// 3) DLP provider DLL (native, separate from the app above): the two required exports
// Recall loads via LoadLibraryEx/GetProcAddress and calls before/after each capture decision.
HRESULT STDMETHODCALLTYPE EnterpriseContextProvider_QueryEnterpriseContext(
    _In_ ULONG totalQuerySizeBytes,
    _Inout_updates_all_(totalQuerySizeBytes / sizeof(EnterpriseContextQuery)) EnterpriseContextQuery* queryBuffer);

VOID STDMETHODCALLTYPE EnterpriseContextProvider_FlushEnterpriseContext();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UserActivityChannel.GetOrCreateUserActivityAsync(id)` | method | Creates/returns a `UserActivity` for a content identifier; always returns a new activity on current Windows (no retrieval of previously saved activities). |
| `UserActivity.ActivationUri` | property | URI Recall launches when the user selects "relaunch" under a snapshot. |
| `UserActivityRequestManager.UserActivityRequested` | event | Optional pull handler Windows fires to fetch the latest activity on demand; in WinUI 3 desktop apps, `UserActivityChannel` can be used directly without this. |
| `UserActivity.ContentInfo` / `UserActivityContentInfo.FromJson(json)` | property / static method | Attaches Schema.org-style JSON metadata, including an `informationProtection` object, describing the content's sensitivity. |
| `informationProtection.state` | JSON field | `"sensitive"` (requires a `labels` array), `"undetermined"` (Recall blocks capture until resolved), or the object is omitted entirely for non-sensitive content. |
| `informationProtection.labels[].labelID` / `.organizationID` | JSON field | Sensitivity label GUID and tenant GUID; multiple labels are allowed, Recall applies the most restrictive DLP-provider result. |
| `EnterpriseContextProvider_QueryEnterpriseContext` | required DLL export | Recall calls this to evaluate a batch of `EnterpriseContextQuery` structs (process, window, file, label) and expects the provider to fill in `Restrictions` / `SensitivityLabelDescription`. |
| `EnterpriseContextProvider_FlushEnterpriseContext` | required DLL export | Called periodically so the provider can free cached strings/resources. |
| `RestrictionEnforcement` (enum) | native enum | `Allow` / `AuditAndAllow` / `Warn` / `Block`, set on `Restrictions.CaptureInRecall` and `Restrictions.CopyToClipboard`. |
| `SetDataLossPreventionProvider` (Group Policy) | policy | Registers the provider DLL: `key:<registry path>; value:<value name>; binary:<dll name>[; minversion:<version>]`; the DLL must be Authenticode-signed and runs in-process inside `AIContext.exe`. |
| `DisableAIDataAnalysis` (policy CSP) | policy | Controls whether Windows saves/analyzes Recall snapshots at all, independent of per-app opt-out. |

## Notes

- Namespace: `Windows.ApplicationModel.UserActivities` (WinRT, UWP/WinUI 3 desktop). Relaunch and sensitivity-label integration both build on the same `UserActivity`; the DLP provider DLL is a separate native component, unrelated to the app's own package.
- To opt an app's window out of Recall capture entirely (not just label it), use `SetWindowDisplayAffinity(WDA_MONITOR)` — this also blocks all other screen-capture surfaces, not just Recall. Web browser apps that have an "InPrivate"-style private-browsing mode should follow the separate browser-specific guidance instead of `SetWindowDisplayAffinity`.
- Feature availability: Copilot+ PC (Qualcomm/Intel/AMD NPU, Arm64EC not supported), April 2025 non-security preview update or later, user opt-in via Settings > Privacy & security > Recall & snapshots.
- This is a distinct API surface from [App Actions and Windows search integration](./app-actions-search.md), which registers Click to Do/search actions rather than pushing relaunch/sensitivity metadata for snapshots.

## Related

- [App Actions and Windows search integration](./app-actions-search.md)
- [AppDiagnosticInfo](./app-diagnostic-info.md)
