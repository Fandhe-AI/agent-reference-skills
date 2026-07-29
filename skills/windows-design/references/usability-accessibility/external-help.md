# External help

External help hosts detailed instructions on a web page outside the app, for content too extensive or advanced to fit in-app — tutorials, walkthroughs, and reference material aimed at a minority of users.

## Signature / Usage

Link out only when in-app help can't reasonably hold the content:

```xaml
<HyperlinkButton Content="Watch the full tutorial online"
                 NavigateUri="https://example.com/help/advanced-tutorial"/>
```

## Options / Props

| Guideline | Detail |
| --- | --- |
| When to use | Content too large for in-app help; tutorials or advanced-function walkthroughs not needed by the general audience |
| When not to use | Content that's brief or specific enough to show in-app — don't send users away from the app unnecessarily |
| Navigation | Prefer contextual deep links straight to the relevant page; a general help hub should still show clear categories/subcategories |
| Search | Useful as a supplement, but never the only way to navigate — some users struggle to phrase what they're looking for |
| Tutorials | Reserve for complex/advanced topics; display them distinctly from standard help so advanced users can find them, and link to them both from a directory and from the related in-app help topic |

## Notes

- External help removes the user from the app experience — use it sparingly, and only when justified by content size or complexity.
- `HyperlinkButton` referenced here is a `Microsoft.UI.Xaml.Controls` (WinUI 3) type, distinct from `System.Windows.Controls` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` APIs.

## Related

- [Guidelines for app help](./app-help-guidelines.md)
- [In-app help](./in-app-help.md)
- [Instructional UI](./instructional-ui.md)
