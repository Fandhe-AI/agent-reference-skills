# Implement URI launch for App Actions on Windows

How to implement an App Action provider using URI launch activation instead of COM activation. Simpler, but doesn't support advanced features like in-context UI or streaming text.

## Signature / Usage

```csharp
ProtocolForResultsOperation? _operation;
protected override void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
{
    var eventargs = Microsoft.Windows.AppLifecycle.AppInstance.GetCurrent().GetActivatedEventArgs();
    if (eventargs != null && eventargs.Kind == ExtendedActivationKind.ProtocolForResults)
    {
        var protocolArgs = eventargs.Data as ProtocolForResultsActivatedEventArgs;
        using (ActionRuntime runtime = ActionRuntimeFactory.CreateActionRuntime())
        {
            ValueSet inputData = protocolArgs.Data;
            var message = inputData["message"];

            var textEntity = runtime.EntityFactory.CreateTextEntity("Message response.");
            ValueSet result = new ValueSet();
            result["response"] = textEntity.Id;

            _operation = protocolArgs.ProtocolForResultsOperation;
            _operation.ReportCompleted(result);
        }
    }
    _window = new MainWindow();
    _window.Activate();
}
```

## Notes

- The action's `invocation.type` in the action JSON is `"Uri"`, with an app-registered protocol scheme (declared via `uap:Protocol` in the package manifest, matching `invocation.uri`).
- Inputs arrive via `AppActivationArguments`/`ProtocolForResultsActivatedEventArgs.Data` (a `ValueSet`); check `Kind == ExtendedActivationKind.ProtocolForResults` before casting.
- Outputs are returned by creating entities via `ActionRuntime.EntityFactory`, putting the entity `Id` into a result `ValueSet`, then calling `ProtocolForResultsOperation.ReportCompleted`.
- Verify the caller with `ProtocolForResultsActivatedEventArgs.CallerPackageFamilyName` — see [Detect and filter callers](./actions-filter-caller.md).

## Related

- [Get started with App Actions on Windows](./actions-get-started.md)
- [Detect and filter callers](./actions-filter-caller.md)
- [Action definition JSON schema](./actions-json.md)
- [Toggle availability](./actions-availability.md)
