# In-app help

In-app help is the default way to present help: displayed within the app, on request, for content that is simple and straightforward enough not to need external hosting. It comes in three forms — help pages, popups, and descriptions.

## Signature / Usage

Reach for in-app help for instructions, advice, and tips that don't introduce fundamentally new content to the user. Reserve complex tutorials for external help instead.

```xaml
<!-- Contextual popup form of in-app help, focused on a single task -->
<Flyout Placement="Bottom">
  <TextBlock Text="Drag files here, or click Browse to add attachments."
             TextWrapping="Wrap" MaxWidth="280"/>
</Flyout>
```

## Options / Props

| Form | Use for | Key guidance |
| --- | --- | --- |
| Help pages | A library of instructions reachable the same way from anywhere in the app | Keep concise; users scan rather than read, so make the relevant topic easy to spot |
| Popups | Highly contextual help tied to the task at hand | Focus on exactly one issue; stay visible without being obstructive; avoid heavy media (video/audio/high-res images) that could lag |
| Descriptions | Extra detail about a feature the user already knows, or how it interacts with others | Don't restate the basics — only add information the user doesn't already have |

## Notes

- If content needs instructional UI instead (teaching a feature the user hasn't discovered), use that rather than a help page or popup.
- If content is too large or advanced for these three forms, move it to external help.
- `Flyout` and `TextBlock` referenced here are `Microsoft.UI.Xaml.Controls` (WinUI 3) types; `Flyout` in particular is distinct from `System.Windows.Controls` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` `Flyout`/popover APIs.

## Related

- [Guidelines for app help](./app-help-guidelines.md)
- [Instructional UI](./instructional-ui.md)
- [External help](./external-help.md)
