# Widget templates (Adaptive Cards)

Windows widget UI and interaction are implemented using Adaptive Cards JSON. Each widget provides a visual template and, optionally, a data template, authored and previewed with the Adaptive Cards Designer (select **Widgets Board** as the host app).

## Signature / Usage

```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.6",
    "body": [
        {
            "type": "TextBlock",
            "text": "You have clicked the button ${count} times"
        },
        {
            "type": "TextBlock",
            "text": "Rendering only if medium",
            "$when": "${$host.widgetSize==\"medium\"}"
        }
    ],
    "actions": [
        {
            "type": "Action.Execute",
            "title": "Increment",
            "verb": "inc"
        }
    ]
}
```

## Options / Props

| Host property | Value | Description |
|------|------|-------------|
| `host.widgetSize` | `"small"` \| `"medium"` \| `"large"` | Size of the pinned widget; drive conditional layout via `$when`. |
| `host.hostTheme` | `"light"` \| `"dark"` | Current device theme. |
| `host.isSettingsPayload` | `true` \| `false` | `true` when the user clicked **Customize widget**; alternative signal to `IWidgetProvider2.OnCustomizationRequested`. |
| `host.isHeaderSupported` | `true` \| `false` | `true` when header customization is supported. |
| `host.isHeader` | `true` \| `false` | `true` when the host is requesting a payload for the widget header. |
| `host.isWebSupported` | `true` \| `false` | `false` when the host cannot render a widget's web content (fallback payload is shown). |
| `host.isUserContextAuthenticated` | `true` \| `false` | `false` restricts supported actions to `Action.OpenUrl`. |

## Notes

- Widgets support only the `Action.Execute` action type; the `verb` string is app-defined and sent to the provider's `OnActionInvoked` to indicate user intent.
- Data binding uses the Adaptive Cards Template Language (`${...}`, `$when` for conditional layout) against the data payload set via `WidgetUpdateRequestOptions.Data`.
- The Adaptive Cards Designer's **Preview mode** simulates host behavior (e.g. `$when` conditionals); without it, all conditional elements render simultaneously.

## Related

- [WidgetUpdateRequestOptions](./widgetupdaterequestoptions.md)
- [implement-widget-provider](./implement-widget-provider.md)
