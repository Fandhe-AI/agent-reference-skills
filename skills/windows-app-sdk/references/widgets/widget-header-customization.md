# Customize the widget header area

By default the widget header shows the `DisplayName` and `Icon` declared in the app manifest's `Definition`/`ThemeResources`. A widget provider can override the header's display name, icon, or hide it entirely by adding a `header` field to the Adaptive Card JSON payload, regardless of the implementation language.

## Signature / Usage

Override the display name string only:

```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.6",
    "body": [ "..." ],
    "header": "Redmond Weather"
}
```

Override both display name and icon:

```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.6",
    "body": [ "..." ],
    "header": {
        "text": "Redmond weather",
        "iconUrl": "https://contoso.com/weatherimage.png"
    }
}
```

## Options / Props

| `header` value | Effect |
|------|-------------|
| (field omitted) | Default presentation: manifest `DisplayName` and `ThemeResources > Icons > Icon`. |
| string | Overrides only the display name string. |
| object `{ text, iconUrl }` | Overrides both the display name string and the icon. |
| `null` | Empty header, letting the widget's own UX expand into the header region. This area is not clickable by the user in this state. |

## Notes

- Header customization lives entirely in the Adaptive Card JSON payload sent from the provider — no separate API or manifest change is required.

## Related

- [widget-provider-manifest](./widget-provider-manifest.md)
- [widgets-create-a-template](./widgets-create-a-template.md)
- [implement-widget-provider](./implement-widget-provider.md)
