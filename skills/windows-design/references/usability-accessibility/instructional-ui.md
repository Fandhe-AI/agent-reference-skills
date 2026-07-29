# Instructional UI

Instructional UI teaches users about non-obvious app functions — such as a required gesture, or a secondary feature they might otherwise miss — directly through the interface, at the moment it's relevant.

## Signature / Usage

Instructional UI is a hint or callout shown at the point of use, not a page the user opens:

```xaml
<!-- A dismissible hint pointing at the relevant control, e.g. a TeachingTip -->
<TeachingTip x:Name="SwipeHint"
             Title="Swipe to see more"
             Subtitle="Swipe left on a message to reveal quick actions."
             Target="{x:Bind MessageList}"
             IsLightDismissEnabled="True" />
```

## Options / Props

| Guideline | Detail |
| --- | --- |
| Good candidates | Non-obvious touch gestures, secondary/optional features, newly introduced or changed functionality |
| Not for | Fundamental features (fix the design instead), features users can already discover unaided, complex features (users seeking these will look for real help) |
| Must be | Simple, memorable, immediately relevant to what the user is about to do |
| Must not | Obscure other UI, force user interaction to proceed, or repeat itself every time the same task is attempted (add a setting to re-enable it instead) |

## Notes

- Overuse is the main failure mode — instructional UI that appears too often gets ignored or becomes an annoyance, defeating its purpose.
- Distinct from in-app help: instructional UI proactively teaches something the user didn't know to look for; in-app help answers a question the user already has.
- `TeachingTip` referenced here is a `Microsoft.UI.Xaml.Controls` (WinUI 3) type, distinct from `System.Windows.Controls` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` APIs.

## Related

- [Guidelines for app help](./app-help-guidelines.md)
- [In-app help](./in-app-help.md)
- [External help](./external-help.md)
