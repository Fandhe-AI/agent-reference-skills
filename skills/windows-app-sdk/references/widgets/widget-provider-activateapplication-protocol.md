# Widget provider ActivateApplication protocol

Command-line activation format used when a widget provider's manifest specifies the `ActivateApplication` activation type instead of `CreateInstance`. Each activation marshals one `IWidgetProvider` method call into a base64url-encoded JSON command-line argument.

## Signature / Usage

```text
--widget-call=[base64url]
```

Decoded `CreateWidget` call:

```json
{
    "WidgetCall": "CreateWidget",
    "WidgetContext": {
        "Id": "98582109-c6bf-4372-89d6-89f57eb754f6",
        "DefinitionId": "PWA_Counting_Widget",
        "Size": "Large"
    }
}
```

## Options / Props

| `WidgetCall` value | Corresponding `IWidgetProvider` method | Payload fields |
|------|------|------|
| `CreateWidget` | `CreateWidget(WidgetContext)` | `WidgetContext { Id, DefinitionId, Size }` |
| `DeleteWidget` | `DeleteWidget(String widgetId, String customState)` | `WidgetId`, `CustomState` |
| `OnActionInvoked` | `OnActionInvoked(WidgetActionInvokedArgs)` | `Args { Verb, Data, CustomState, WidgetContext }` |
| `OnWidgetContextChanged` | `OnWidgetContextChanged(WidgetContextChangedArgs)` | `Args { WidgetContext }` — e.g. triggered when `Size` changes |
| `Activate` | `Activate(WidgetContext)` | `WidgetContext { Id, DefinitionId, Size }` |
| `Deactivate` | `Deactivate(String widgetId)` | `WidgetId` |

## Notes

- Microsoft recommends the `CreateInstance` activation type with the standard `IWidgetProvider` interface implementation instead; this protocol is documented for completeness and is not recommended for most widget provider implementations.
- Each JSON object always includes `WidgetCall` plus one field per method parameter, named as the parameter but capitalized. Widget providers should ignore unexpected fields to tolerate future additions.
- `CreateInstance` takes precedence over `ActivateApplication` when both are declared in the manifest's `Activation` element.

## Related

- [widget-provider-manifest](./widget-provider-manifest.md)
- [IWidgetProvider](./iwidgetprovider.md)
- [implement-widget-provider](./implement-widget-provider.md)
