# Detect and filter callers for App Actions on Windows

Mechanisms an App Action provider can use to limit which apps can query for or invoke its actions, e.g. to protect actions that have per-use costs.

## Signature / Usage

```json
"invocation": {
  "type": "Uri",
  "uri": "urilaunchaction-protocol://messageaction?token=${$.Token}",
  "inputData": { "message": "${message.Text}" }
}
```

```csharp
var context = runtime.GetActionInvocationContextFromToken(token);
if (context == null)
{
    // Caller is not the Action Runtime
}
```

## Notes

- `allowedAppInvokers` in the action definition JSON restricts which AppUserModelIDs (AUMIDs) can *discover* an action via `GetActionsForInputs`/`GetAllActions`; it does not by itself prevent invocation by other means.
- URI activation: check `ProtocolForResultsActivatedEventArgs.CallerPackageFamilyName` for the suffix `_cw5n1h2txyewy` to confirm the caller was Windows (rich activation only), or use the `$.Token` reserved query-string parameter with `ActionRuntime.GetActionInvocationContextFromToken` to validate the caller was the Action Runtime.
- COM activation: use `CoImpersonateClient` + `GetApplicationUserModelIdFromToken` (via the CsWin32 NuGet package) to read the caller's AUMID at runtime inside the action invocation (not in app launch code).

## Related

- [Action definition JSON schema](./actions-json.md)
- [Implement URI launch](./actions-uri-launch.md)
- [Manually implement IActionProvider](./actions-iactionprovider-manual.md)
