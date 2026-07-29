# Widget principles

Five principles guide the design of Windows widgets: Glanceable, Focused & Useful, Predictable & Calm, User-Anchored, and Timely.

## Signature / Usage

Planning your app's widget experience:

1. Identify the content or actions most worth quick access to without opening the app or website, weighing them against the widget principles below.
2. Decide how many separate widgets the app should support — a single widget should focus on one specific purpose.
3. Decide the content for each widget across its small/medium/large sizes: the purpose stays the same, but the amount of information expands with size.
4. Design the click targets/deep links the widget exposes, so interactions navigate users directly into the app or website.
5. Implement a widget provider — a packaged Win32 desktop app or a Progressive Web App (PWA) — to send the widget's layout and data to the Widgets Board.

## Options / Props

| Principle | Guidance |
|---|---|
| Glanceable | A widget should immediately deliver its primary value to the user. |
| Focused & Useful | A widget should serve one clear, primary purpose. |
| Predictable & Calm | A widget's behaviors and patterns help users complete tasks predictably. |
| User-Anchored | A widget should reflect the user's needs, preferences and intents. Content should be based on the user's own data or explicitly stated interests. |
| Timely | A widget should surface relevant information at the right time and in the right context. |

## Notes

- Adhering to these principles helps ensure the Widgets Board provides a consistent and familiar experience across all widgets.

## Related

- [Widget design fundamentals](./widgets-design-fundamentals.md)
- [Widget interaction design guidance](./widgets-interaction-design.md)
- [Widget states and built-in UI components](./widgets-states-and-ui.md)
- [Integrate with the widget picker](./widgets-picker-integration.md)
