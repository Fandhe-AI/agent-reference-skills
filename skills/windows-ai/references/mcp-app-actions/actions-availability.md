# Toggle availability of an App Action for Windows

How a provider can mark one or more of its registered actions as currently unavailable, e.g. to require login or a subscription first.

## Signature / Usage

```csharp
void SetActionAvailability(bool actionIsAvailable)
{
    using (ActionRuntime runtime = new ActionRuntime())
    {
        runtime.SetActionAvailability("ExampleActionProvider.SendMessage", actionIsAvailable);
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| isAvailable | Boolean (JSON) | Initial availability in the action definition JSON file; optional, defaults to `true`. |
| `ActionRuntime.SetActionAvailability(actionId, isAvailable)` | method | Changes an action's availability at runtime after registration. |

## Notes

- Set `"isAvailable": false` in the action definition JSON to make an action unavailable immediately after installation.

## Related

- [Action definition JSON schema](./actions-json.md)
- [Get started with App Actions on Windows](./actions-get-started.md)
